We need to add base componenets for client-side page - the top navbar and the bottom footer. The will be on every page expect those for admin panel

### Navbar 
Create 'components/layout/Navbar.tsx'.

Navbar should contain:
- Logo on the left
- Navigation links from right to left: "Co robimy", "Dla kogo", "Jak działamy", "Polecają", (Cta button "Umów rozmowe") - this button should scroll to the contact section on the same page.
- The navbar should be fixed to the top of the page and shrink when the user scrolls down. The navbar will be added to every page and will scroll to the appropriate section on the page.
- There will be a mobile version of the navbar with a hamburger menu. The menu should open from the top and cover 3/4 of the screen, the screen behind should be blurred and darkened, opacity should be around 0.8. The menu items should be stacked vertically, with spacing and separator, dropdown menu should have smooth animation rolling out from top to bottom.
- The button should have animation of hover, it should smoothly scale from 1 to 1.05, a slightly change of color should go from center to the edges. When the user hovers the button, the cursor should change to a pointer. When user clicks on the button, it should have a smooth animation of scaling to 0.9 and back to 1, also the the animation of color should go from center to the edges. The top  Navbar, logo animation - the logo should scale from 1 to 1.1 when hoever the 


### Footer
Create 'components/layout/Footer.tsx'.

Footer should contain:
- Logo on the top-left corner
- First column with links navigating to the same-page sections: 
  -"O nas"
  -"Co robimy"
  -"Dla kogo"
  -"Jak działamy"
  -"Polecają"
  -"Kontakt"
- Second column with links navigating to legal documents:
  -"Polityka prywatnosci"
  -"Regulamin"
- Third column with contact information:
  -"Adres: ul. Gdyńska G/9,
80-340 Gdańsk"
  -"Email: [info@weunite.pl]"
  -"Telefon: +48 537 732 320"
-"Copyright © 2026 WeUnite. All rights reserved."
- Social media logos on the right: Linkedin, Facebook, Instagram
- Mobile version should have a different layout, with the logo on the top-left corner and the social media icons on the top-right corner. 
- The links should be stacked vertically in the middle of the footer, with spacing and separator. 
- In background there should be text WeUnite with opacity 0.04 on very bottom of the footer.
  

