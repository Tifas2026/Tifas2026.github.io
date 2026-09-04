[ANLEITUNG.txt](https://github.com/user-attachments/files/31825997/ANLEITUNG.txt)
ABNAHME VOR ORT — Installation und Betrieb
==========================================

WAS DAS IST
Eine kleine Web-App zum Erfassen von Mängeln und Restarbeiten bei
Wohnungsabnahmen: Text, zuständiger Handwerker, bis zu drei Fotos pro
Position. Auf Knopfdruck erzeugt sie daraus ein PDF im festen
2-Spalten-Layout (4 Positionen pro A4-Seite).

Sie läuft im Browser auf iPhone, iPad, Android und PC. Kein Konto, keine
Installation aus einem Store, keine Verbindung zu Dritten. Nach dem ersten
Aufruf funktioniert sie auch ohne Internet.


KURZ VORAB TESTEN, OHNE SERVER
index.html aus dem ZIP in einen Ordner entpacken und doppelklicken. Die
Datei enthaelt alles - auch die PDF-Erzeugung. Wichtig: erst entpacken,
nicht im ZIP-Fenster doppelklicken.


1) HOCHLADEN
Alle Dateien aus diesem Ordner per FTP in ein Verzeichnis auf Ihrem
Webspace legen, zum Beispiel:

    father-son.it/abnahme/

Die Dateien müssen zusammen im gleichen Verzeichnis liegen:

    index.html              die komplette App (PDF-Erzeugung eingebaut)
    sw.js                   macht die App offline-fähig
    manifest.webmanifest    Name und Symbol für den Homescreen
    icon-192.png            Symbol
    icon-512.png            Symbol

Wichtig: Die Adresse muss mit https:// aufrufbar sein. Nur dann
funktionieren Offline-Betrieb und Homescreen-Symbol. Bei http:// läuft die
App zwar, aber nur mit Internetverbindung.


2) AUF DAS HANDY BRINGEN
Adresse im Browser des Geräts öffnen (z. B. https://father-son.it/abnahme/),
dann:

    iPhone / iPad:  Teilen-Symbol  ->  "Zum Home-Bildschirm"
    Android:        Menü (drei Punkte)  ->  "App installieren"
    PC:             Lesezeichen genügt, oder in Chrome/Edge installieren

Danach startet die Erfassung wie eine App, ohne Browserleiste.


3) ARBEITEN
Kopfdaten (Objekt, Einheit, Datum) einmal oben eintragen.
Dann pro Mangel:

    "+ Mangel erfassen"
    Raum antippen              wird dem Text vorangestellt
    Text tippen                Bausteine antippen geht schneller
    Handwerker antippen        oder Firma eintippen
    Kamera / Galerie           bis zu 3 Fotos
    "Speichern & nächste"

Diktieren: Knopf unter dem Textfeld (Android/Chrome, Safari ab iOS 14.5) -
braucht Internet. Ohne Netz das Mikrofon auf der Tastatur verwenden, das
laeuft auf dem Geraet selbst.

Am Ende "PDF" -> Aufbau waehlen:
  Gesamtprotokoll         alle Positionen der Reihe nach, Leerzeilen bis 30
  Nach Gewerk gebuendelt  jedes Gewerk beginnt auf einer neuen Seite
  Nur ein Gewerk          nur die Seiten fuer diesen Handwerker
Die Positionsnummern bleiben in allen Varianten gleich.
Dann Teilen, Herunterladen oder Oeffnen. Auf dem iPhone ist
"Teilen" der bequemste Weg — von dort in Dateien, Mail oder WhatsApp.


4) WO DIE DATEN LIEGEN
Ausschließlich im Browser des jeweiligen Geräts, nicht auf dem Server und
nicht bei uns. Das heißt:

  - Die Erfassung funktioniert ohne Netz, auch im Keller.
  - Die Daten sind nur auf diesem einen Gerät sichtbar.
  - Erzeugen Sie das PDF am Ende der Abnahme, nicht Tage später.
    Wer den Browser-Speicher löscht, löscht auch die Erfassung.

"Sicherung speichern" legt eine JSON-Datei mit allen Positionen und Fotos
ab; "Sicherung laden" holt sie zurück — auch auf einem anderen Gerät.


5) NEUE ABNAHME
"Neue Abnahme beginnen" leert die Liste. Vorher PDF erzeugen und, wenn
gewünscht, Sicherung speichern.


6) GEWERKE UND BAUSTEINE ANPASSEN
Ganz oben im Skriptteil von index.html steht ein Block KONFIGURATION mit
drei Listen: ROOMS (Raeume), PHRASES (Textbausteine), TRADES (Gewerke).
Eintraege in Anfuehrungszeichen, mit Komma getrennt - die Reihenfolge ist
die Reihenfolge der Schaltflaechen. PAD_TO steuert, bis zu welcher
Positionsnummer Leerzeilen mitgedruckt werden.

LOGO: im gleichen Block steht const LOGO = "". Dort gehoert eine Data-URI
des Logos hinein (data:image/png;base64,...). Ist der Wert leer, bleibt der
Platz oben frei. Das Logo erscheint gross auf der ersten Seite jedes
Abschnitts und klein in der Kopfzeile der Folgeseiten.

SCHLUSSSATZ: der Text unter jeder Tabelle, ebenfalls in diesem Block.


7) ÄNDERUNGEN
Wird eine Datei ersetzt, in sw.js die Zeile

    const CACHE = "abnahme-v7";

auf v2, v3 usw. hochzählen. Sonst zeigen bereits installierte Geräte
weiterhin die alte Version aus ihrem Offline-Speicher.


8) SICHTBARKEIT
Die Seite ist nicht mit der Website verbunden: kein Menueintrag, keine
Verlinkung, keine Aenderung an bestehenden Seiten. In index.html steht
<meta name="robots" content="noindex, nofollow">, Suchmaschinen nehmen sie
also nicht auf. Wer die Adresse kennt, kann sie aber aufrufen - fuer echte
Abschottung .htaccess-Passwortschutz setzen.

Der Offline-Speicher (sw.js) gilt nur fuer diesen Unterordner und kann auf
den Rest der Website nicht zugreifen.
