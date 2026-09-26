"""Smallest check that fails if validation or the honeypot breaks. Run: python -m pytest api  (or: python api/test_index.py)"""
from fastapi.testclient import TestClient

from index import app

c = TestClient(app)
GOOD = {"name": "Jane Doe", "email": "jane@example.com", "phone": "+44 7700 900123", "course": "FutureX"}


def test_enquiry_accepted():
    assert c.post("/api/enquire", json=GOOD).status_code == 201


def test_bad_email_rejected():
    assert c.post("/api/enquire", json=GOOD | {"email": "nope"}).status_code == 422


def test_honeypot_dropped_silently():
    r = c.post("/api/enquire", json=GOOD | {"website": "http://spam"})
    assert r.status_code == 201 and r.json() == {"ok": True}


if __name__ == "__main__":
    test_enquiry_accepted(); test_bad_email_rejected(); test_honeypot_dropped_silently(); print("ok")
