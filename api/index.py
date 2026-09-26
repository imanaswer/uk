"""G-TEC UK enquiry API. Runs as a Vercel Python function in production, uvicorn locally."""
import json
import logging
import os
import re
import urllib.request
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, field_validator

log = logging.getLogger("gtec")
app = FastAPI(title="G-TEC UK API", docs_url=None, redoc_url=None)

EMAIL_RE = re.compile(r"^\S+@\S+\.\S+$")
PHONE_RE = re.compile(r"^\+?[\d\s()-]{7,20}$")


class Enquiry(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(max_length=200)
    phone: str = Field(max_length=30)
    course: str = Field(min_length=2, max_length=120)
    website: str = ""  # honeypot: humans never fill this

    @field_validator("name", "course")
    @classmethod
    def strip(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("required")
        return v

    @field_validator("email")
    @classmethod
    def email_ok(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_RE.match(v):
            raise ValueError("Please enter a valid email address.")
        return v

    @field_validator("phone")
    @classmethod
    def phone_ok(cls, v: str) -> str:
        v = v.strip()
        if not PHONE_RE.match(v):
            raise ValueError("Please enter a valid phone number.")
        return v


def deliver(payload: dict) -> None:
    """Forward to whatever the business uses (CRM, Slack, Zapier, Make...).
    ponytail: webhook only. Add a DB table when enquiries must be listed in-app."""
    url = os.environ.get("ENQUIRY_WEBHOOK_URL")
    if not url:
        log.warning("ENQUIRY_WEBHOOK_URL unset; enquiry logged only: %s", json.dumps(payload))
        return
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={"content-type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=8) as res:
        if res.status >= 300:
            raise RuntimeError(f"webhook returned {res.status}")


@app.get("/api/health")
def health() -> dict:
    return {"ok": True}


@app.post("/api/enquire", status_code=201)
def enquire(body: Enquiry) -> dict:
    if body.website:
        return {"ok": True}  # bot: pretend success, drop silently
    payload = body.model_dump(exclude={"website"}) | {"source": "gtec.uk landing", "received_at": datetime.now(timezone.utc).isoformat()}
    try:
        deliver(payload)
    except Exception as exc:  # noqa: BLE001
        log.exception("enquiry delivery failed")
        raise HTTPException(status_code=502, detail="We couldn't send your enquiry just now. Please try again or call +44 7859 731738.") from exc
    return {"ok": True}
