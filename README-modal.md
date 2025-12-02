
Modal / Projekt-Preview — Anleitung

Was diese Implementierung macht
- Beim Klicken auf ein Video innerhalb eines Projektes öffnet ein zentriertes Modal mit Titel und kurzer Beschreibung.
- Der Hintergrund wird unscharf (backdrop-filter) und leicht aufgehellt.
- Das Modal zeigt **keine** Bild-Vorschau mehr — nur Text (Titel + Beschreibung).
- Schließen mit dem ✕ oben rechts, durch Klick außerhalb des Panels oder mit der Escape-Taste.

Wie du projekt-spezifische Inhalte setzt
- Du kannst ein Projekt-Artikel-Element (article.project) ein zusätzliches Attribut geben, z. B.:

  <article class="project" data-modal-desc="Längere Projektbeschreibung hier...">

  Das js sucht nur nach `data-modal-desc` für die Beschreibung und verwendet die im Projekt vorhandene `.caption` als Titel. Es gibt keine Bild‑Vorschau im Modal mehr.

Weitere Hinweise
- Styling: `assets/css/styles.css` enthält die Modal-Stile. Anpassungen für Blur-Level, Farben oder Größe sind dort möglich.
- Verhalten: `assets/js/main.js` enthält die Logik — nur Elemente mit der Klasse `modal-trigger` öffnen das Modal (z. B. Videos).

Wenn du möchtest, kann ich die Modal-Ansicht weiter anpassen (z. B. sanfte Einblendung, text-spezifische Lesbarkeitshilfen oder wieder einen optionalen Bild-Slot).
Modal / Projekt-Preview — Anleitung

Was diese Implementierung macht
- Beim Klicken auf ein Bild oder Video innerhalb eines Projektes öffnet ein zentriertes Modal.
- Der Hintergrund wird stark unscharf (backdrop-filter) und leicht aufgehellt.
- Links ist ein Text-Block (Titel + Platzhalter-Text), rechts wird ein PNG (idealerweise mit transparentem Hintergrund) angezeigt.
- Schließen mit dem ✕ oben rechts, durch Klick außerhalb des Panels oder mit der Escape-Taste.

Wie du projekt-spezifische Inhalte setzt
- Du kannst ein Projekt-Artikel-Element (article.project) ein zusätzlisches Attribut geben, z.B.:

  <article class="project" data-modal-img="assets/images/my-transparent.png" data-modal-desc="Längere Projektbeschreibung hier...">

  Das js sucht zuerst nach data-modal-img, ansonsten prüft es vorhandene PNGs im Projekt und als Fallback nimmt es das erste Bild.

Weitere Hinweise
- Styling: `assets/css/styles.css` enthält die Modal-Stile. Anpassungen für Blur-Level, Farben oder Größe sind dort möglich.
- Verhalten: `assets/js/main.js` enthält die Logik. Du kannst dort z.B. weitere Felder (Links, Gallery) dynamisch befüllen.

Wenn du möchtest, kann ich die Modal-Ansicht optisch an dein Layout anpassen oder Beispiele mit echten PNGs hinzufügen.
