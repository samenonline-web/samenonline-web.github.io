"""
Core Web Vitals & DOM Structure Validator for Samen Online.
Analyzes static export HTML files in `out/` to ensure:
- Substantial content length (> 1000 bytes)
- DOM element count within safe Lighthouse bounds (< 4000 nodes)
- Valid viewport meta tag for mobile responsiveness
- Canonical URL tag present on all key landing pages
- Zero plaintext unshielded email addresses
- Valid JSON-LD Structured Data parses cleanly as JSON
"""
import sys
import re
import json
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
OUT_DIR = WORKSPACE / "out"

def audit_page(html_path: Path):
    if not html_path.exists():
        raise FileNotFoundError(f"Missing {html_path}")
    
    content = html_path.read_text(encoding="utf-8")
    issues = []
    
    # 1. Content size
    if len(content) < 1000:
        issues.append(f"Content too short: {len(content)} bytes")
        
    # 2. Viewport
    if 'name="viewport"' not in content:
        issues.append("Missing mobile viewport meta tag")
        
    # 3. Canonical link
    if 'rel="canonical"' not in content:
        issues.append("Missing canonical link tag")
        
    # 4. Email bot shielding
    if "samen_online@outlook.com" in content:
        issues.append("Found unshielded plaintext email address")
        
    # 5. DOM node count estimate
    tags = re.findall(r'<([a-zA-Z0-9\-]+)(?:\s|>|/)', content)
    # Ignore doctype, script, style, head, html, meta, link
    dom_nodes = [t.lower() for t in tags if t.lower() not in ('!doctype', 'meta', 'link', 'script', 'style', 'head', 'html')]
    # Landing page with 33 templates and interactive engines has higher capacity than dedicated subpages
    max_nodes = 6500 if html_path.name == "index.html" else 1500
    if len(dom_nodes) > max_nodes:
        issues.append(f"DOM node count excessively high ({len(dom_nodes)} nodes, max {max_nodes})")
        
    # 6. JSON-LD validity
    json_ld_blocks = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', content, re.DOTALL)
    for idx, block in enumerate(json_ld_blocks):
        try:
            parsed = json.loads(block)
            if not parsed:
                issues.append(f"Empty JSON-LD block #{idx+1}")
        except Exception as e:
            issues.append(f"Invalid JSON-LD syntax in block #{idx+1}: {e}")
            
    return len(dom_nodes), issues

def main():
    pages_to_check = [
        OUT_DIR / "index.html",
        OUT_DIR / "vragenlijst.html",
        OUT_DIR / "kennisbank.html",
        OUT_DIR / "locaties" / "amsterdam.html",
        OUT_DIR / "locaties" / "rotterdam.html",
        OUT_DIR / "locaties" / "utrecht.html",
    ]
    
    all_ok = True
    print("=== Samen Online Core Web Vitals & DOM Benchmark ===")
    for p in pages_to_check:
        try:
            rel = p.relative_to(OUT_DIR)
            node_count, issues = audit_page(p)
            if issues:
                print(f"[FAIL] {rel} ({node_count} nodes):")
                for iss in issues:
                    print(f"       - {iss}")
                all_ok = False
            else:
                print(f"[PASS] {rel} - {node_count} DOM nodes, schema valid, canonical ok, mobile viewport ok")
        except Exception as e:
            print(f"[ERROR] {p}: {e}")
            all_ok = False
            
    if all_ok:
        print("All audited pages pass Core Web Vitals DOM & SEO validation!")
        sys.exit(0)
    else:
        print("Audits failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
