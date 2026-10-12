"""Convert the programme profile .docx files in public/course/new coures into src/lib/programmes.json.
Run: python scripts/import-programmes.py"""
import glob, json, re, zipfile, xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
SMALL = {'and', 'of', 'in', 'for', '&'}
KEEP = {'HVAC', 'IT', 'AI', '4.0'}
TITLE = re.compile(r'^(?:\d+\s*\|\s*)?((Foundation|Professional|Advanced Professional) Certificate in (.+))$')
LEVELS = {'Foundation': 'foundation', 'Professional': 'professional', 'Advanced Professional': 'advanced'}

def text(el): return ''.join(t.text or '' for t in el.iter(W + 't')).strip()

def domain_case(s):
    return ' '.join(w if w.rstrip(',') in KEEP else w.lower() if w.lower() in SMALL and i else w.capitalize() if '-' not in w else '-'.join(p.capitalize() for p in w.split('-'))
                    for i, w in enumerate(s.split()))

def slugify(s): return re.sub(r'[^a-z0-9]+', '-', s.lower().replace('&', 'and')).strip('-')

def lines(path):
    body = ET.fromstring(zipfile.ZipFile(path).read('word/document.xml')).find(W + 'body')
    for el in body:
        if el.tag == W + 'p' and (t := text(el)): yield t
        elif el.tag == W + 'tbl':
            for tr in el.iter(W + 'tr'):
                a, b = [text(tc) for tc in tr.findall(W + 'tc')][:2]
                yield ('MODULE', re.sub(r'^Module \d+', '', a).strip(), b)

out, prev = [], None
for path in sorted(glob.glob('public/course/new coures/*.docx')):
    p, section = None, None
    for ln in lines(path):
        if isinstance(ln, tuple): p['modules'].append({'title': ln[1], 'desc': ln[2]}); continue
        if m := TITLE.match(ln):
            p = {'slug': f"{LEVELS[m[2]]}-{slugify(m[3])}", 'title': m[1], 'subject': m[3], 'level': m[2] + ' Certificate', 'tier': LEVELS[m[2]],
                 'duration': {'Foundation': '4 Months', 'Professional': '6 Months', 'Advanced Professional': '9 Months'}[m[2]],
                 'domain': domain_case(prev) if prev and prev.isupper() else '', 'modules': [], 'outcomes': []}
            out.append(p); section = None
        elif p is None: pass
        elif ln.startswith('Domain:'): p['domain'] = domain_case(re.match(r'Domain:\s*(.+?)\s{2,}Level', ln)[1])
        elif ln in ('Course Objective', 'Course Outline', 'Modules', 'Indicative Learning Outcomes'): section = ln
        elif ln.startswith('Delivery Approach:'): p['delivery'] = ln.split(':', 1)[1].strip(); section = None
        elif ln == 'Academic Note' or ln.isupper(): section = None
        elif section == 'Course Objective': p['objective'] = ln
        elif section == 'Course Outline': p['outline'] = ln
        elif section == 'Modules': p['modules'].append({'title': ln, 'desc': ''})
        elif section == 'Indicative Learning Outcomes': p['outcomes'].append(ln.lstrip('•• ').strip())
        prev = ln

# The catalogue lists a few titles under two domains; keep both, with the domain in the second URL.
seen = set()
for p in out:
    if p['slug'] in seen: p['slug'] += '-' + slugify(p['domain'].split(',')[0].split(' &')[0])
    seen.add(p['slug'])
slugs = [p['slug'] for p in out]
assert len(out) == 329 and len(set(slugs)) == len(slugs), (len(out), len(set(slugs)))
assert all(p['domain'] and p['objective'] and p['outline'] and p['modules'] and p['outcomes'] and p['delivery'] for p in out)
json.dump(out, open('src/lib/programmes.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(out), 'programmes,', len({p['domain'] for p in out}), 'domains')
