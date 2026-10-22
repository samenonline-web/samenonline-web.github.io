import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

SCREENSHOTS_DIR = Path("arena/results/ui_artifacts")
SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

def capture_all():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # 1280x800 desktop viewport
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        
        # Navigate to local build
        page.goto("http://localhost:3000", wait_until="networkidle")
        
        # Switch to dark mode if not already active
        is_dark = page.evaluate("() => document.documentElement.classList.contains('dark')")
        if not is_dark:
            # Click dark mode toggle button in navbar
            theme_btn = page.query_selector("button[aria-label*='Donkere modus'], button[aria-label*='dark'], button[title*='modus'], button[title*='Donker']")
            if theme_btn:
                theme_btn.click()
                time.sleep(0.5)
            else:
                page.evaluate("() => document.documentElement.classList.add('dark')")
        
        # Step 01: Boot / Hero
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.3)
        page.screenshot(path=str(SCREENSHOTS_DIR / "01_boot.png"))
        print("Captured 01_boot.png")

        # Step 02: Title / Menu
        navbar = page.query_selector("header") or page.query_selector("nav")
        if navbar:
            navbar.screenshot(path=str(SCREENSHOTS_DIR / "02_title_or_menu.png"))
        else:
            page.screenshot(path=str(SCREENSHOTS_DIR / "02_title_or_menu.png"))
        print("Captured 02_title_or_menu.png")

        # Step 03: Enter Play / Template Carousel
        page.evaluate("window.scrollTo(0, 650)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "03_enter_play.png"))
        print("Captured 03_enter_play.png")

        # Step 04: Gameplay Idle / Template Grid
        page.evaluate("window.scrollTo(0, 1400)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "04_gameplay_idle.png"))
        print("Captured 04_gameplay_idle.png")

        # Step 05: Primary Action / Price Estimator Calculator
        page.evaluate("window.scrollTo(0, 2400)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "05_primary_action.png"))
        print("Captured 05_primary_action.png")

        # Step 06: HUD Readable / ROI Calculator
        page.evaluate("window.scrollTo(0, 3200)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "06_hud_readable.png"))
        print("Captured 06_hud_readable.png")

        # Step 07: Secondary State / Redesign Comparison Slider
        page.evaluate("window.scrollTo(0, 4000)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "07_secondary_state.png"))
        print("Captured 07_secondary_state.png")

        # Step 08: After Interaction / Speed Audit & Packages
        page.evaluate("window.scrollTo(0, 4800)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "08_after_interaction.png"))
        print("Captured 08_after_interaction.png")

        # Step 09: Edge / Stable / FAQ & Checklist
        page.evaluate("window.scrollTo(0, 5600)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "09_edge_or_stable.png"))
        print("Captured 09_edge_or_stable.png")

        # Step 10: Final Frame / Footer & Bot-Shielded Email
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.4)
        page.screenshot(path=str(SCREENSHOTS_DIR / "10_final_frame.png"))
        print("Captured 10_final_frame.png")

        browser.close()
        print("All 10 shots captured successfully!")

if __name__ == "__main__":
    capture_all()
