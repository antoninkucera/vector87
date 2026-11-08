# SEO audit a doporučení pro Vector87

**Web:** https://vector87.com/  
**Datum auditu:** 8. listopadu 2026

**Vector87 má dobrý technický základ. Největší potenciál pro organic traffic vidím ve vlastních datech, ze kterých vzniknou důvěryhodné a snadno citovatelné analýzy.** Před rozšiřováním obsahu bych ale vyřešil nadměrnou velikost podcastových stránek a sjednotil interpretaci některých metrik.

Audit jsem provedl přímým načtením všech **60 URL ze sitemapy**, kontrolou HTML, metadat, jazykových vazeb, přesměrování a vybraného obsahu. Nemám přístup k Search Console ani analytice, takže skutečný stav indexace, návštěvnost, dotazy a zpětné odkazy zůstávají neověřené. Core Web Vitals jsem neměřil.

## 1. Co už funguje dobře

| Oblast | Zjištění |
|---|---|
| Dostupnost | Všech 60 URL ze sitemapy vrací HTTP 200. |
| Procházení | `robots.txt` povoluje procházení a odkazuje na funkční sitemap index. |
| Canonical | Všech 60 stránek má canonical odpovídající vlastní URL. |
| Jazyky | EN/CS mají vzájemné `hreflang`, včetně odkazů na sebe. |
| Metadata | Všechny kontrolované stránky mají description; titulky se neopakují. |
| HTML obsah | Texty, metriky a tabulky jsou dostupné už ve zdrojovém HTML. |
| Doména | Testované HTTP a www varianty končí na `https://vector87.com/`. |
| Neexistující URL | Testovací neexistující stránka správně vrací 404. |

Ke grafům navíc poskytuješ sémantické tabulky. To je dobrý základ pro přístupnost a strojové zpracování. Máš také [metodiku](https://vector87.com/methodology/) a [autorský profil](https://vector87.com/about/), včetně `ProfilePage` a `Person` strukturovaných dat.

**Nenalezl jsem plošnou technickou blokaci indexace. To ale samo o sobě nepotvrzuje, že Google stránky indexuje.**

## 2. Nejdůležitější oprava: velikost podcastových stránek

Naměřil jsem následující velikosti samotného HTML:

| Stránka | Velikost |
|---|---:|
| [Podcasty EN](https://vector87.com/academy/podcasts/) | 2,83 MB |
| [Podcasty CS](https://vector87.com/cs/academy/podcasts/) | 2,37 MB |
| [Places EN](https://vector87.com/places/) | 1,56 MB |

Obě podcastové stránky překračují aktuálně dokumentovaný **2MB limit Googlebotu**. Google uvádí, že obsah za limitem nezpracuje. V načteném HTML leží za touto hranicí také patička a inline skript pro filtrování. Jde tedy o konkrétní riziko neúplného zpracování stránky. [Dokumentace Googlebotu](https://developers.google.com/search/docs/crawling-indexing/googlebot), [vysvětlení limitu](https://developers.google.com/search/blog/2026/03/crawler-blog-post).

Doporučuji:

- Zobrazovat například 25–50 epizod na stránku.
- Přidat stránkování se skutečnými HTML odkazy, které fungují i bez JavaScriptu.
- Každé stránce archivu dát vlastní canonical.
- Filtrační skript přesunout do externího souboru.
- Samostatné stránky epizod vytvářet tam, kde přidáš vlastní komentář, praktické závěry nebo návaznost na data Vector87.

Po opravě ověřit výsledné HTML přes živý test URL v Search Console. U Places bych velikost snížil také, ale podcasty mají přednost.

## 3. Nejsilnější příležitost pro E-E-A-T: zpřesnit důvěryhodnost dat

Metodika správně rozlišuje inzeráty od skutečných nástupů a zmínky technologií od jejich reálného používání. Některé části webu však formulují závěry silněji, než tato metodika dovoluje.

| Konkrétní nález | Doporučená úprava |
|---|---|
| Hlavička uvádí „S&P 500 coverage: 508 firms“, metodika popisuje 500 emitentů a dodatečné zaměstnavatele. | Oddělit počet sledovaných emitentů S&P 500 od celkového počtu zaměstnavatelů a skutečně úspěšně načtených zdrojů. |
| Homepage uvádí Databricks 712 a Snowflake 441; Cloud & Tech uvádí 706 a 440. | Ověřit, zda jde o jiný filtr nebo zastaralý text. Všechny komentáře generovat ze stejných agregací jako grafy. |
| Homepage označuje AI Developera jako „fastest-growing“, přestože zároveň vysvětluje počáteční fázi časových řad. | Do získání srovnatelné historie používat formulaci o velikosti či četnosti role v aktuálním vzorku. |
| Stránka Data Engineer má sekci „Top Locations … for this Role“, ale uvádí například 187 pozic v Česku, což je zároveň celkový počet AI/data pozic pro ČR na homepage. | Zobrazovat počty pro konkrétní roli, nebo výslovně označit čísla jako celý AI/data vzorek. |

Zjištění vycházejí z [homepage](https://vector87.com/), [Cloud & Tech](https://vector87.com/cloud-tech/), [profilu Data Engineer](https://vector87.com/roles/data-engineer/) a [metodiky](https://vector87.com/methodology/). Rozdílné hodnoty mohou mít legitimní vysvětlení; problém je, že ho návštěvník u daného čísla nevidí.

**U každé zásadní metriky bych zobrazoval datum, rozsah vzorku, jmenovatel a stručnou definici.** Například:

> Python je zmíněn ve 440 z 802 podrobných inzerátů zařazených do této analýzy. Snapshot: 1. 11. 2026. Zmínka nemusí znamenat povinný požadavek.

Takto prezentované číslo se lépe ověřuje, interpretuje i cituje.

Do datové pipeline bych přidal kontroly konzistence: shodu komentářů s grafy, jednoznačnost firemních identit a správné přiřazení role a geografického filtru.

## 4. Jak konkrétně posílit E-E-A-T

E-E-A-T není samostatný ranking faktor ani skóre, které zvýší jeden schema tag. Google ho používá jako rámec pro zkušenost, odbornost, autoritu a důvěryhodnost; největší váhu v tomto rámci má důvěra. [Vysvětlení Googlu](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

U Vector87 bych postupoval takto:

| Oblast | Nejlepší další krok |
|---|---|
| **Experience — zkušenost** | Popsat skutečné problémy při tvorbě datasetu: deduplikaci, chybné klasifikace, výpadky ATS, rozdíl mezi názvem role a jejím obsahem. Přidat konkrétní příklady. |
| **Expertise — odbornost** | Rozšířit metodiku o validaci extrakce technologií, ručně kontrolovaný vzorek a známé chyby klasifikace. U odhadů headcountu vysvětlit zdroj i nejistotu. |
| **Authoritativeness — autorita** | Vytvářet výstupy, na které mohou odkazovat odborné newslettery, média, lektoři a konference. Pomohou konkrétní datová zjištění a grafy s podklady. |
| **Trust — důvěryhodnost** | Publikovat historii oprav, verze metodiky, pokrytí zdrojů a pravidla pro neúspěšné aktualizace. Jasně oddělit měření, odhad a autorskou interpretaci. |

Autorský profil už máš poměrně dobrý. Další přínos bych hledal hlavně v:

- Viditelném „Analýzu připravil / zkontroloval Antonín Kučera“ přímo u analýz.
- Odkazech na konkrétní přednášky a projekty dokládající relevantní zkušenost.
- Jednotném identifikátoru autora `Person @id`, na který budou odkazovat články a datasety.
- Vysvětlení, kde používáš AI a co kontroluješ ručně.

**Zvláštní pozornost zaslouží Places.** Uvádíš zdroje World Bank, Eurostat a Global Peace Index, ale v kontrolované stránce jsem nenašel přímé odkazy na jejich konkrétní podklady. Žebříček navíc porovnává země s chybějícími pilíři.

Doplnil bych odkazy na datové řady, období, výpočet při chybějících datech a indikátor úplnosti. U relokačních informací je potřeba uvést, pro jaké občanství a situaci platí, datum ověření a primární úřední zdroj. Samotné obecné skóre relokace tuto informaci nenahradí.

## 5. Kde bych hledal organic traffic

Nejsilnější odlišností Vector87 je **vlastní měření pracovního trhu**. Tomu bych podřídil obsahovou strategii.

Doporučuji tři navazující typy obsahu:

| Typ | Příklady | Úloha |
|---|---|---|
| Profily rolí | Data Engineer, Analytics Engineer, AI Developer | Dlouhodobě odpovídat na otázky o dovednostech a kariérních cestách. |
| Datová srovnání | Databricks vs. Snowflake v inzerátech; AWS vs. Azure vs. GCP | Získávat relevantní návštěvnost a citace díky vlastním zjištěním. |
| Pravidelné reporty | Stav AI/data náboru v listopadu 2026 | Budovat publikum, historii měření a důvod k opakovaným návštěvám. |

Jde o **návrhy témat, nikoli ověřená klíčová slova s naměřenou hledaností**.

Začal bych těmito výstupy:

1. **Jaké dovednosti firmy požadují od Data Engineerů:** konkrétní četnosti, velikost vzorku, seniorita a limity.
2. **Databricks vs. Snowflake: co ukazují pracovní inzeráty:** výslovně oddělit náborové zmínky od tržního podílu.
3. **AI Developer vs. ML Engineer:** rozdíly v náplni práce, technologiích a požadavcích.
4. **AI a datové pozice v Česku ve sledovaném vzorku:** jasně přiznat, že nejde o celý český pracovní trh.

Každý výstup by měl obsahovat odpověď na hlavní otázku hned v úvodu, několik zjištění z vlastních dat, tabulku nebo graf, metodiku a doporučený způsob citace.

U měsíčních reportů zatím popisuj stav vzorku. Změny trhu vyhodnocuj až na srovnatelném souboru zaměstnavatelů, aby přidání nových zdrojů nevypadalo jako růst poptávky.

### Architekturu rozšiřovat postupně

Profily rolí už existují, takže bych je nejprve dopracoval. Následně mohou dávat smysl samostatné stránky pro technologie, srovnání a vybrané země.

Nevytvářel bych automaticky všechny kombinace role × země × technologie. Nová stránka má mít dostatek dat a vlastní užitečný závěr. Jinak vznikne velké množství podobných stránek s malou hodnotou.

Na českých profilech bych přirozeně používal i české názvy:

> **Datový analytik: dovednosti a požadavky firem | Vector87**

Anglický název může zůstat v obsahu. Titulky i úvod by měly odpovídat tomu, co stránka skutečně nabízí.

## 6. Technická a obsahová vylepšení druhé priority

- **Sjednotit interní odkazy na URL s koncovým lomítkem.** Našel jsem 58 interně odkazovaných variant bez lomítka; všechny přesměrovávají na funkční variantu s lomítkem. Je to drobná optimalizace, nikoli zásadní závada.
- **Do sitemapy přidávat pravdivé `lastmod`.** Aktuálně chybí. Datum má vyjadřovat podstatnou změnu obsahu, ne každý build. Chybějící `/sitemap.xml` nevadí, protože používáš funkční sitemap index. [Doporučení Googlu](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- **Rozšířit `Dataset` metadata.** Základ už existuje. Přínosné budou verze, licence, přesnější pokrytí, metodika a případně stažitelná agregovaná data. U `distribution` uvádět pouze skutečně dostupný export. [Dokumentace Dataset](https://developers.google.com/search/docs/appearance/structured-data/dataset).
- **U Academy přidat vlastní hodnoticí kritéria.** Pro koho kurz je, jak navazuje na zjištěné dovednosti a zda vycházíš z osobního absolvování, nebo kontroly sylabu.
- **Podcastový radar rozvíjet redakčně.** AI shrnutí už transparentně přiznáváš. Pro vybrané epizody přidávej vlastní hodnocení, praktické použití a návaznost na role.
- **Změřit mobilní výkon.** Ověřit homepage, profil role, Places a podcastový archiv. Z velikosti HTML nelze poctivě odvodit konkrétní hodnoty LCP, INP nebo CLS.

`llms.txt` už máš. Pro získání návštěvnosti z Googlu bych mu nyní další čas nevěnoval: Google uvádí, že ho pro vyhledávání ani jeho generativní funkce nepoužívá. [Oficiální doporučení](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## 7. Doporučené pořadí na příštích 90 dní

| Období | Úkol | Jak ověřit výsledek |
|---|---|---|
| **První týden** | Zmenšit podcastové archivy a opravit nekonzistentní metriky. | HTML bezpečně pod limitem; čísla odpovídají definicím a filtrům. |
| **První týden** | Ověřit indexaci v Search Console. | Zkontrolovat homepage, CS homepage, jednu roli v obou jazycích a oba podcastové archivy; porovnat deklarovaný a Googlem vybraný canonical. |
| **Do 30 dní** | Doplnit metodiku, zdroje, autorství a tři hlavní profily rolí. | U zásadních tvrzení je dohledatelný autor, datum, vzorek a výpočet. |
| **30–60 dní** | Publikovat dvě datová srovnání a první citovatelný report. | Sledovat nebrandové imprese, relevantní dotazy, odkazy a přihlášení k odběru. |
| **60–90 dní** | Rozšiřovat témata podle získaných dat z vyhledávání. | Upřednostnit stránky s relevantními impresemi a příležitostí zlepšit odpověď nebo proklik. |

V Search Console bych sledoval zvlášť EN/CS, brandové/nebrandové dotazy a jednotlivé sekce. Vedle kliků měřit také přihlášení k newsletteru, použití datových exportů a další cílové akce.

**Kdybych měl vybrat jen tři investice: opravit velikost podcastových stránek, sjednotit datová tvrzení a vytvořit z vlastních dat dva až tři výstupy, které budou chtít ostatní citovat.** To je pro Vector87 nejsilnější spojení technického SEO, organického růstu a E-E-A-T.
