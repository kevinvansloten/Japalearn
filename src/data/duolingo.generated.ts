/**
 * The Duolingo Japanese course's vocabulary, unit by unit.
 *
 * GENERATED — do not edit. Run `npm run import:duolingo` to rebuild it, and
 * read scripts/import-duome.ts for where each field comes from and why the
 * readings are the way they are.
 *
 * 310 units and 5646 words, 5244 of them with a known
 * reading and 5174 with a Dutch gloss.
 *
 * Delimited text rather than object literals, because six thousand of those is
 * most of a megabyte of source nobody will ever read or edit. A line beginning
 * '#' opens a unit — number, name, name in Dutch, goal, goal in Dutch. Every
 * other line is a word — written form, reading ('=' when the word is already
 * its own reading, empty when unknown), meanings, meanings in Dutch. Fields
 * are tab-separated and the meaning lists are separated by semicolons.
 */
export const DUOLINGO_DATA = `#1	Basics	Basics	Order food and drinks	Bestel eten en drinken
おちゃ	=	green tea;tea	thee
ください	=	please;please give me	alstublieft
ごはん	=	rice	rijst
すし	=	sushi	sushi
です	=	is;it's;you're;I'm;she's;he's;they're;we're;there is	is
と	=	and;that;door;with;for;or;as;when;if;nor;to;doors;whenever;from;city	en
みず	=	water	water
#2	People	People	Describe people	Gebruik bijvoeglijke naamwoorden
いしゃ	=	doctor	dokter
かっこいい	=	cool;good-looking;stylish;handsome;attractive	stoer;mooi
がくせい	=	student	student
せんせい	=	teacher;Professor;teachers;Doctor	leraar;professor;dokter
ひと	=	person	persoon
べんごし	=	lawyer	advocaat
やさしい	=	kind;easy;nice	aardig;aardige;makkelijk
#3	Greetings	Greetings	Greet and say goodbye	Begroet en neem afscheid
けん	=	Ken;ticket	Ken
こんにちは	=	good afternoon;hi;hello	hallo
こんばんは	=	good evening	goedenavond
さん	=	Mr.;Miss;Mrs.;3;three;Ms.;Mt.	meneer;mevrouw
なおみ	=	Naomi	Naomi
はな	=	flowers;flower;Hana;nose	Hana's;Hana;bloem;neus
またあした	=	see you tomorrow	tot morgen
#4	Cafe	Cafe	Talk about food	Praat over eten
おいしい	=	good;delicious;tasty	lekker
か	=	or;is it?;that;if;what;whether	Kan;van
これ	=	this;these;this one;that's	dit;Dit
は	=	is;with;regarding;for;tooth;at;when;on;about;as for;of;during;in;by;teeth;was;are	ga;drink;maak;gaat;heb;heeft;zijn;houden;is;komt;van
はい	=	yes	ja
ケーキ	=	cake	taart
サラダ	=	salad	salade
ピザ	=	pizza	pizza
ラーメン	=	ramen	ramen
#5	Countries	Countries	Talk about countries and nationalities	Praat over landen en nationaliteiten
おおきい	=	big	groot
ちいさい	=	small	klein
にほん	=	Japan	Japan
にほんじん	=	Japanese person	Japanner
アメリカ	=	America;the USA;the US;American;the United States	Amerika;Amerikaanse
アメリカじん	=	American	Amerikaan
カナダ	=	Canada	Canada
カナダじん	=	Canadian	Canadees
ブラジル	=	Brazil	Braziliaanse
ブラジルじん	=	Brazilian	Braziliaan
ベトナム	=	Vietnam	Vietnam
ベトナムじん	=	Vietnamese	Vietnamees
#6	Directions	Directions	Ask for directions	Ontkennende zinnen en beantwoord vragen
いいえ	=	no	nee
えき	=	station;train station;stations;train stations	station
ここ	=	here;this place;over here	hier
じゃない	=	do not;am not;I'm not;is not;are not;does not;not	geen;niet
だいがく	=	university	universiteit
どこ	=	where	waar
コンビニ	=	convenience store	buurtwinkel
デパート	=	department store	warenhuis
バスてい	=	bus stop	bushalte
ホテル	=	hotel	hotel
#7	Belongings	Belongings	Talk about your belongings	Praat over je spullen
あかい	=	red	rood
かばん	=	bag;bags	tas
くつ	=	shoe	schoen
しろい	=	white	wit
てぶくろ	=	glove;gloves;mitten;mittens	handschoen
の	=	for;'s;one;of;’s;s';data's	z'n;of;';’s;de;no;ter;der;van;des
わたしの	=	my;mine	mijn;Mijn
コート	=	court;coat;coats;courts	jas
#8	Friends	Friends	Describe your friends	Beschrijf je vrienden
あかるい	=	bright;cheerful;well-lit	lichte;Lichte;licht
おもしろい	=	interesting;fun;funny	interessante;interessant
たなか	=	Tanaka	Tanaka-san
ともだち	=	friend	vriend
なかやま	=	Nakayama	Nakayama
やまぐち	=	Yamaguchi	
#9	Time	Time	Tell time	Vertel de tijd
いち	=	one	één
いま	=	now	nu
じ	=	o'clock	uur
すみません	=	sorry;pardon me;excuse me;I'm sorry	sorry
なんじ	=	what time	hoe laat
に	=	through;made;with;inside;atop;onto;make;for;upon;let;within;out of;two;among;as;per;as a;into;as an;at;on;over;about;to;of;against;during;from;in;by;o'clock	naar
はん	=	thirty	half
一	いち	one	één
三	さん	three	drie
二	に	two	twee
#10	Travel	Travel	Ask about travel	Vind plekken en reisartikelen
あそこ	=	over there	daar
かさ	=	umbrella	paraplu
きっぷ	=	ticket	kaartje
くうこう	=	airport	luchthaven
それ	=	that;that one;it;that's	Dat;dat
ちかてつ	=	subway	metro
ちず	=	map	kaart
ぼうし	=	hat	hoed
スマホ	=	smartphone	smartphone
パスポート	=	passport	paspoort
中山		Nakayama	Nakayama
山口	やまぐち	Yamaguchi	Yamaguchi
田中		Tanaka	Tanaka
#11	Welcome	Welcome	Introduce yourself	Stel jezelf voor en beschrijf je thuis
おおさか	=	Osaka	Osaka
おなまえは	=	What’s your name?	uw naam is
きれい	=	beautiful;pretty;clean;pure	mooi
しずか	=	quiet	stil
しゅっしん	=	from;origin;hometown;home country	afkomstig
とし	=	city	stad
とても	=	very	erg
どう	=	how	hoe
にぎやか	=	lively	levendig
にすんでいます	=	live in;is living	woon
はじめまして	=	Nice to meet you	aangenaam
まち	=	town	stad
も	=	even;any;also;as well;some;as many as;neither ... nor;both ... and;again;too;or;still;and;whole;either	ook;noch
トロント	=	Toronto	Toronto
ニューヨーク	=	New York	New York
京都	きょうと	Kyoto	Kyoto
日本	にほん	Japan;Japanese	Japan
東京	とうきょう	Tokyo	Tokio
私	わたし	me;I	Ik;mij;ik
#12	Hobbies	Hobbies	Talk about habits	Gewoontes in de tegenwoordige tijd
Jポップ		J-pop	J-pop
えいが	=	movie	films
おんがく	=	music	muziek
ききます	=	listen;listens;ask	luister;Luister
ざっし	=	magazine	tijdschrift
します	=	makes;are doing;make;feel;wears;am going to do;would do;play;having;will have;plays;do;does;have;I'm doing;am going to play;give;going to have;doing	doet
ときどき	=	occasionally	soms
まんが	=	manga	manga
やきゅう	=	baseball	honkbal
よく	=	often;frequently;well;frequent;better;nicely;carefully;closely;hard;clearly;a lot;good;used to	vaak
を	=	through;with;for;upon;along;at;on;about;to;of;object marker;from;in	naar
アニメ	=	anime	anime
サッカー	=	soccer	voetbal
ジャズ	=	jazz	jazz
テレビ	=	TV	televisie
ニュース	=	news	nieuws
バスケットボール	=	basketball	basketbal
ロック	=	rock	rock;Rock
本	ほん	book;books	boek
見ます	みます	watch;will watch;watches;looks at;look at;see;look;sees;I watch	Kijkt
読みます	よみます	read;will read;reads;going to read	Lees;lees;leest
#13	Mealtime	Mealtime	Discuss your eating habits	Bespreek je eetgewoonten
あさごはん	=	breakfast	ontbijt
たべます	=	eat;eats	eet
のみます	=	drink;drinks;will drink;take	drinkt;drink;Drink
ばんごはん	=	dinner	avondeten
ひるごはん	=	lunch	lunch
べんとう	=	bento	bento
まいあさ	=	every morning	elke ochtend
まいにち	=	every day	elke dag
まいばん	=	every night	elke avond
カレー	=	curry	curry
コーヒー	=	coffee	koffie
サンドイッチ	=	sandwich	sandwich
ジュース	=	juice	sap
パスタ	=	pasta	pasta
パン	=	bread	brood
七時	しちじ	seven o'clock	zeven uur
五	ご	five	vijf
八	はち	eight;8;eights	acht
六	ろく	six	zes
四時	よじ	four o'clock	vier uur
時	とき	while;time;clock;when;o'clock;o’clock	uur;tij;tijd
#14	Clothes	Clothes	Shop for clothes	Kleding kopen
Tシャツ		T-shirt	T-shirt
あおい	=	blue	blauw
ありがとうございます	=	thank you	Dank u wel
いくら	=	how much	hoeveel;Hoeveel
えん	=	yen	yen
かわいい	=	cuter;cute;pretty;sweet	schattig
が	=	softens the tone;indicates the subject;but;although	ga;van
くろい	=	black	zwarte
この	=	this;these;that's	deze;Deze
さいふ	=	wallet	portemonnee
たかい	=	expensive	duur;dure;Dure
ね	=	is it not;sleep;wouldn't you agree;don't they;you know;isn't he;alright;right;aren't they;isn't she;would you;hasn't;aren't;haven't you;wasn't it;doesn't he;aren't you;didn't;okay;wouldn’t;doesn't she;don't you;isn't there;won't you;didn't we;correct;doesn't;doesn't it;isn't it;wasn't	toch;nietwaar
はちょっと	=	I don't really like;doesn't work very well;kind of	is een beetje;zijn een beetje
ふく	=	clothes	kleren
ほしい	=	wants;want;you'd	wil
みせ	=	store	winkel
やすい	=	cheap;inexpensive	goedkoop;goedkope;Goedkope
ジャケット	=	jacket	jas
スカート	=	skirt	rok
ネクタイ	=	tie	stropdas
千	せん	thousand;a thousand;one thousand;1000	duizend;vierduizend;tweeduizend
古い	ふるい	the old;an old;old	oud
新しい	あたらしい	new;newer	nieuw
百	ひゃく	hundred;a hundred;100;one hundred	tweehonderd;honderd;vierhonderd;vijfhonderd
#15	New Friend	New Friend	Introduce yourself and others	Stel jezelf en anderen voor
Kポップ		K-pop	K-pop
かのじょ	=	girlfriend	vriendin
かれし	=	my boyfriend	vriend
かんこく	=	Korea;korean	Korea
こちら	=	this;these;over here;this way	dit;hier
さんは	=	Mr.;Ms.	meneer;mevrouw;heer;de heer
すき	=	like	houden van
ちゅうごく	=	China	China
と言います		is called	heet
どんな	=	what kind of	welke;wat voor
アクション	=	action	actie
アメリカの	=	American	Amerikaans
アンドリュー	=	Andrew	Andrew's;Andrew
イギリス	=	Britain;the United Kingdom;British;the UK	Britse
エリカ	=	Erica;Erika	Erika's;Erika
ゲーム	=	game;video games	game;spel
コメディ	=	comedy	komedie
ダニエル	=	Daniel	Daniël;Daniëls
ドラマ	=	drama	soaps
ファンタジー	=	fantasy	fantasie
ホラー	=	horror	horror
日本の		Japanese	Japans
#16	Routines	Routines	Talk about your daily routine	Werkwoorden voor toekomstige acties
あした	=	tomorrow	morgen
いつも	=	always	altijd
おきます	=	get up;going to wake up;wake up;wakes up;ahead of time;puts;will put;in advance;going to get up	sta
およぎます	=	swim;will swim;swims;am going to swim	zwem
からて	=	karate	karate
ごろ	=	around	rond
つくります	=	make	maak
でかけます	=	go out;am going to go out	uit
ねます	=	sleep;go to sleep;will go to sleep;am going to sleep	slapen
はしります	=	runs;run	Ren;ren
まいしゅう	=	every week	elke week
らいしゅう	=	next week	volgende week
シャワーをあびます	=	take a shower	
バレーボール	=	volleyball	volleybal
メールを読みます		check emails	
ヨガ	=	yoga	yoga
ラジオ	=	radio	radio
何時	いつ	when;what time	Hoe laat
十	じゅう	10;ten;tenth	tien;ten
十一	じゅういち	eleven	elf
十二	じゅうに	twelve	twaalf
買います	かいます	will buy	koop
食べます	たべます	eat;am going to eat;will eat;eats;will have;has;are going to eat	eet
飲みます	のみます	will have;drink;having;drinks;am going to drink;have;will drink;take	drink
#17	Transport	Transport	Ask about travel details	Vraag naar reisdetails
あきはばら	=	Akihabara	Akihabara
あさくさ	=	Asakusa	Asakusa-station;Asakusa
うえのこうえん	=	Ueno Park	Ueno Park
かかります	=	take;it takes;it will take;it'll take;takes	duurt
ぐらい	=	approximately	ongeveer
しぶや	=	Shibuya	Shibuya
しゅうてん	=	last stop	eindstation
つぎ	=	next	de volgende
つぎの	=	next	volgende
でんしゃ	=	train	trein
どのぐらい	=	how long	
ながい	=	long	lang
はやい	=	fast;early;quick	snel
もうすぐ	=	very soon	binnenkort
バス	=	bus	bus
分	ぶん	minute;minutes	minuten;minuut;min
十分	じゅうぶん	sufficient;enough;adequate;ten minutes	tien minuten
時間	じかん	time;hour;hours	uur;tijd
来ます	きます	will be here;will come;is coming;comes;come;are coming;coming	komen;komt
行きます	いきます	am going;are going;go;will go;going;is going;goes;I go;am going to go;I'm going;will be there	Gaat;gaat;ga
#18	Weekend	Weekend	Talk about weekend activities	Praat over weekendactiviteiten
あそびます	=	hang out;hangs out;I will play;play;plays;will hang out	Speel;speel
あに	=	older brother	oudere broer
あね	=	older sister	zus
かぞく	=	family	familie
しゅうまつ	=	weekend	weekend
じゅうどう	=	judo	judo
どうが	=	video	video
ひとりで	=	alone	alleen
れんあい	=	romance	romantische
スポーツ	=	play sports	doe aan sport
テニス	=	tennis	tennis
ミステリー	=	mystery	mysterie
土曜日	どようび	Saturday	zaterdag
日曜日	にちようび	Sunday	zondag
母	はは	mother	moeder
父	ちち	father	vader
話します	はなします	speaks;speak;tells;talks;talk;tell	praat
#19	Weather	Weather	Discuss the weather	Praat over seizoenen en het weer
あき	=	autumn	herfst
あたたかい	=	warm;hot	warm
あつい	=	hot;thick	heet
あめ	=	candies;candy;sweets;rainy	regenachtige;regent;regenachtig;snoep
うみに行きます		go to the sea;go to the beach;go to the ocean;visit the sea;go to the shore	
おんせん	=	hot spring	onsen
こうえん	=	park	park
さむい	=	cold	koud
なつ	=	summer	zomer
はなび	=	firework	vuurwerk
はる	=	spring	lente
はれ	=	clear	zonnig
ふゆ	=	winter	winter
ゆき	=	snow	sneeuwdagen;Sneeuwdag;sneeuw;sneeuwt
ココア	=	hot chocolate	warme chocolademelk
コンサート	=	concert	concert
プール	=	pool	zwembad
七月	しちがつ	July	juli
九月	くがつ	September	september
休み	やすみ	break	vakantie
日	にち	day	dag
#20	Restaurant	Restaurant	Order food and drinks	Bestel eten en drinken
うどん	=	udon	udon
ええと	=	um;well	Uh
おにぎり	=	rice ball	onigiri
こうちゃ	=	black tea	zwarte thee
じゃあ	=	well then;well;see you;so;bye;okay then	dan;dus
すこし	=	a bit;few;some;a little	beetje;een beetje
その	=	the;that;those;its;th	Dat;Die;diens
そば	=	soba	soba
ていしょく	=	set meal	set
てんぷら	=	tempura	tempura
みそしる	=	miso soup	misosoep
アイスクリーム	=	ice cream	ijsje
アイスコーヒー	=	iced coffee	ijskoffie
レストラン	=	restaurant	restaurant
一つ	ひとつ	one	één
三つ	みっつ	three	drie
二つ	ふたつ	two	Twee;twee
四つ	よっつ	four	vier
大きい	おおきい	large;great;considerable;loud;big	Groot;Grote
小さい	ちいさい	small;little	klein;kleine;Kleine
水	みず	water	water
#21	Pastries	Pastries	Order pastries	Bestel gebakjes
あきます	=	opens;open	
あの	=	those;ah;that over there;um;those over there;that	Die;die
あまい	=	sweet	zoet
いちご	=	strawberry	aardbei
ぜんぶで	=	in total	in totaal
どうですか	=	How about	Hoe zit het met
どの	=	any;each;which;what;every;how long	Welke;Welk
はすきですか	=	do ... like	Houd je van
まっちゃ	=	matcha	matcha
みどり	=	green	groen
もの	=	something;things;thing;anything;the one;what;piece;stuff;property;person	ding
カップケーキ	=	cupcake	cupcake
クッキー	=	cookie	koekje
ケーキや	=	cake shop	banketbakkerij
チョコレート	=	chocolate	chocolade
チーズケーキ	=	cheesecake	cheesecake
ドーナツ	=	donut	donut
パイ	=	pie	taart
七つ	ななつ	seven	zeven
五つ	いつつ	five	vijf
六つ	むっつ	six	zes
#22	Station	Station	Ask for directions	Navigeren op het station
WiFi		wifi	
おてあらい	=	restroom	toilet
かいさつ	=	ticket gate	kaartcontrole
かいだん	=	stairs	trap
じはんき	=	vending machine	automaat
ちか	=	underground	ondergronds
ちかい	=	near;close	dichtbij
でぐち	=	exit	uitgang
でんわ	=	telephone	telefoon
とおい	=	far	ver
のりかえ	=	transfer	overstap
はありますか	=	is there	
はありません	=	is not	
エレベーター	=	elevator	lift
カフェ	=	cafe	café
コインロッカー	=	coin locker	kluisje
コンセント	=	outlet	stopcontact
ゴミばこ	=	trash can	prullenbak
タクシー	=	taxi	taxi
ホーム	=	platform	perron
一階	いっかい	first floor;on the first floor	on the first floor
二階	にかい	second floor;on the second floor	op de tweede verdieping
#23	New Home	New Home	Describe your house	Gebruik bezitsvormen met dingen
いい	=	like;well;do you want;may I;fine;alright;prefer;hope;best;nice;okay;good;great—it's	goed
いえ	=	house	huis
いす	=	chair	stoel
いつ	=	when	Wanneer
おふろ	=	bath	badkamer
があります	=	is;there is;there are;are;has;there's;have	Er is;er is
こんしゅう	=	this week	deze week
せまい	=	narrow;cramped;small	smal
せんたくき	=	washing machine	wasmachine
そうじき	=	vacuum cleaner	stofzuiger
たぶん	=	probably	misschien
つくえ	=	desk	bureau
でんしレンジ	=	microwave oven	magnetron
ひっこします	=	am going to move;is going to move;move	verhuis;verhuist
ひろい	=	wide;spacious;big;large	breed
ふとん	=	futon;futons	futon
ほんだな	=	bookshelf	boekenplank
まだ	=	yet;too;hasn't;still;haven't	nog
れいぞうこ	=	refrigerator	koelkast
アパート	=	apartment	appartement
エアコン	=	air conditioner	airconditioning
キッチン	=	kitchen	keuken
テーブル	=	table	tafel
ベッド	=	bed	bed
リビング	=	living room	woonkamer
九時	くじ	nine o'clock	negen uur
#24	Family 2	Family 2	Talk about your family	Praat over je familie
います	=	is;am;has been;have been;is being;going to stay;have;there is;has;stays;there are;there's;are	heb
いもうと	=	younger sister	zusje
いもうとさん	=	younger sister	zusje
えいご	=	English	Engels
おこさん	=	child	kind
おとうと	=	younger brother	jongere broer
おとうとさん	=	younger brother	jongere broer
おにいさん	=	older brother	oudere broer
おねえさん	=	your older sister	oudere zus
かんこくご	=	Korean	Koreaans
がいます	=	is;has got;there are;have;has;are;there is;there's	
ができます	=	know;can play	kan
きょうだい	=	sibling	broer of zus;broers of zussen
こども	=	child	kind
たいわん	=	Taiwan	Taiwan
ちゅうごくご	=	Chinese	Chinees
はいますか	=	do ... have	heb je
インドネシア	=	Indonesia	Indonesië;Indonesische
オーストラリア	=	Australia;Australian;australia's	Australië;Australische
コーチ	=	coach	coach
ソウル	=	Seoul	Seoul
一人	ひとり	one person	één
二人	ふたり	two	twee
日本ご		Japanese	Japans
#25	Emergency	Emergency	Handle emergencies	Omgaan met noodgevallen
〇		0	nul
あぶない	=	dangerous	gevaarlijk
おねがいします	=	I need	alstublieft
きゅうきゅうしゃ	=	ambulance	ambulance
きょう	=	today	vandaag
くすりを飲みます		take	
ぐあいがわるい	=	unwell	slecht
けいさつ	=	police	politie
ごかぞく	=	family	familie
ごりょうしん	=	your parents	ouders
さい	=	years old	jaar
すわります	=	sit;going to sit	zitten
そこ	=	there;that place	daar
だいじょうぶ	=	alright;okay;OK	goed;oké
ちかく	=	near	in de buurt
ちゃんと	=	properly	goed
でんわばんごう	=	phone number	telefoonnummer
はいません	=	is not;are not;do not exist;there is no;not present;do not have	
びょういん	=	hospital	ziekenhuis
アレルギー	=	allergy	allergie
九	きゅう	nine;9	negen
休みます	やすみます	rest;take a break;absent from;going to rest	rust
何さい		how old	oud
#26	Sights	Sights	Explore new places	Ontdek nieuwe plekken
あれ	=	hey;that one over there;what;that	dat
おかし	=	snack	snack
おてら	=	temple	tempel
おみやげ	=	souvenir	souvenir
じんじゃ	=	shrine	shinto-schrijn
すてき	=	lovely	mooi
たてもの	=	building	gebouw
だいすき	=	love	Ik hou heel veel van
ところ	=	about to;somewhere;places;parts;just;aspects;right;place;area	plek;plaats
な	=	do not;adjective ending;don't;without;added emotion;name	nietwaar;na
はらじゅく	=	Harajuku	Harajuku
ふじさん	=	Mt. Fuji	Fuji-san
ほんとうに	=	really	echt
ゆうめい	=	famous	beroemd
デザート	=	dessert	dessert
ピザや	=	pizzeria	pizzeria
ポストカード	=	postcard	ansichtkaart
ラーメンや	=	ramen shop	ramenrestaurant
何ですか		What is it?	wat is
山	やま	mountain	berg
高い	たかい	higher;expensive;pricey;tall;big;high	duur;dure
#27	Date Plans	Date Plans	Plan a date	Plan een date
うでどけい	=	wristwatch	polshorloge
えいがかん	=	movie theater	bioscoop
おしゃれ	=	stylish	stijlvol
かんとく	=	director	regisseur
がたのしみです	=	looking forward to;am looking forward to	kijk uit naar
きます	=	wears;wear;comes;come;am going to wear;coming;d	draag
げんき	=	lively	energiek
たんじょうび	=	birthday	verjaardag
よやくします	=	am going to reserve;book;will reserve	reserveren
ステーキ	=	steak	biefstuk
スーツ	=	suit	pak
デート	=	date	date
ドレス	=	dress	jurk
ネックレス	=	necklace	ketting
ブラウス	=	blouse	blouse
プレゼント	=	gift	cadeau
ホットドッグ	=	hot dog	hotdog
ポップコーン	=	popcorn	popcorn
ワイン	=	wine	wijn
人	ひと	person	persoon
#28	Travel 2	Travel 2	Make travel plans and suggestions	Gebruik de wil-vorm
あと	=	after	na
え	=	pictures;painting;picture;paintings	schilderij
かえります	=	am returning;will return home;returning;will go home;am going home;are returning;return	
かんこうをします	=	to sightsee;to go sightseeing;to tour;to do sightseeing;to visit tourist spots	
しゃしん	=	photo	foto
で	=	as a;under;through;with;via;off;using;for;due to;by means of;leave;so;into;at;on;over;and;of;are;during;because of;from;out of;in;by	bij;at
とります	=	takes;get;going to take;have;eat;will take;take	
どうぶつえん	=	zoo	dierentuin
にく	=	meat	vlees
ひこうき	=	airplane	vliegtuig
ひろば	=	plaza	plein
びじゅつかん	=	art museum	museum
りょこう	=	trip	reis
スーツケース	=	suitcase	koffer
チケット	=	ticket	ticket
フランス	=	French;France	Frankrijk
フランスりょうり	=	French cuisine	Frans eten
ライオン	=	lion	leeuw
会います	あいます	am going to meet up;will meet;is meeting;will see;see;are going to meet	ontmoeten
何	なに	what	wat
来月	らいげつ	next month	volgende maand
#29	Cooking	Cooking	Talk about food	Boodschappen doen en koken
いっしょに	=	together	samen
ぎゅうどん	=	gyudon	gyudon
しお	=	salt	zout
しょうゆ	=	soy sauce	sojasaus
しょっぱい	=	salty	zout
つかいます	=	will use;uses	gebruik;Gebruik
でも	=	but;however;neither;is also;even if ... is;even if ... were;nor;even on;though	maar;Maar
とうふ	=	tofu	tofu
とんかつ	=	pork cutlets	tonkatsu
なま	=	raw	rauw
ひま	=	free	vrije tijd
ぶたにく	=	pork	varkensvlees
もっと	=	more	meer
やさい	=	vegetable	groente
コーラ	=	cola	cola
スーパー	=	supermarket	supermarkt
ソース	=	sauce	saus
ビール	=	beer	bier
レシピ	=	recipe	recept
作ります	つくります	going to make;make;I make;am going to cook;will make;makes;creates;create;builds;cooks;produce;cook;am going to make	maak
卵	たまご	egg	ei
木曜日	もくようび	Thursday	donderdag
魚	さかな	fish	vis
#30	Bookstore	Bookstore	Describe your surroundings	Niet verleden negatieve werkwoorden
あまり	=	not a lot of;not so;not too;that;not much;not that;not often;really;less;not very;not very often;much;not really;not many;not very well;very	niet vaak;niet erg
はいゆう	=	actor	acteur
むずかしい	=	difficult;tough	moeilijk
アニソン	=	anime song	animesongs
アルバム	=	album	album
カードゲーム	=	card game	kaartspel
コーナー	=	section	hoek
セール	=	sale	uitverkoop
ドキュメンタリー	=	documentary	documentaire
ノンフィクション	=	nonfiction	non-fictie
バンド	=	band	band
パズル	=	puzzle	puzzel
フィクション	=	fiction	fictie
ポスター	=	poster	poster
ポップス	=	pop music	popmuziek
本や		bookstore	boekwinkel
話	はなし	story	verhaal
#31	Office	Office	Talk about work schedules	Bespreek werkschema's
うけつけ	=	reception	receptie
うたいます	=	sing;will sing;am going to sing	zing
から	=	because;starting;through;off;out of;as;so;down;beginning;at;since;and then;of;from;in;after;by	vanaf
このあと	=	after this	straks
ごご	=	afternoon;p.m.;p.m	in de middag;middags;middag
ごぜん	=	a.m.;morning	ochtend;ochtends
さいご	=	last;end	laatste;einde
しょくどう	=	cafeteria	kantine
ひる休み		lunch break	lunchpauze
まで	=	through;even;before;until;to;till	naar;tot
よろしくおねがいします	=	nice to meet you;glad to work with you	aangenaam kennis te maken
エンジニア	=	engineer	ingenieur
オリエンテーション	=	orientation	oriëntatie
カラオケ	=	karaoke	karaoke
クライアント	=	client	klant
チャーハン	=	fried rice	gebakken rijst
バー	=	bar	bar
パソコン	=	computer	computer
フライドポテト	=	French fries	friet
プリンター	=	printer	printer
プレゼン	=	presentation	presentatie
ミーティング	=	meeting	vergadering
何階	なんがい	which floor	welke verdieping
#32	Birthday	Birthday	Navigate the city to a birthday party	Vind de weg naar een verjaardagsfeestje
いとこ	=	cousin	neef
いらっしゃい	=	welcome	welkom;Welkom
おさら	=	plate	bord
おもちゃ	=	toy	speelgoed
きります	=	going to cut	snijden
でんきや	=	electronics store	elektronicawinkel
とちゅうで	=	on the way	onderweg
どうやって	=	how	hoe
にのります	=	get on;going to ride;take;will ride;ride;going to get on	
まちます	=	wait;will wait;waits;going to wait	wacht
まであるきます	=	walk up to;walk as far as;walk until;walk to	
みち	=	street	straat
わたります	=	cross	steek over
カップ	=	cup	kop
タブレット	=	tablet;tablets	tablet
ナイフ	=	knife	mes
フォーク	=	fork	vork
フライドチキン	=	fried chicken	gefrituurde kip
ヘッドホン	=	headphone	koptelefoon
ポテトチップス	=	potato chip	chips
六百	ろっぴゃく	six hundred	zeshonderd
円	えん	yen	yen
家	いえ	home	huis
百円ショップ	ひゃくえんショップ	100-yen shop	100-yenwinkel
#33	Events	Events	Talk about events	Praat over evenementen
おおみそか	=	New Year's Eve	oudejaarsavond
おまつり	=	festival	festival
こんしゅうまつ	=	this weekend	weekend
たいこ	=	taiko	taiko
ちかくの	=	nearby	nabijgelegen
はなびたいかい	=	fireworks festival	vuurwerkfestival
イベント	=	event	evenement
イルミネーション	=	illumination	verlichting
カウントダウン	=	countdown	aftellen
クリスマス	=	Christmas	Kerstmis
コミュニティーセンター	=	community center	gemeenschapscentrum
コンテスト	=	contest	wedstrijd
ダンス	=	dance	dans
チョコバナナ	=	choco banana	chocobanaan
ハロウィン	=	Halloween	Halloween
パレード	=	parade	parade
パーティー	=	party	feest
三十一日	さんじゅういちにち	thirty-first	eenendertigste
八月	はちがつ	August	augustus
十二月	じゅうにがつ	December	december
十月	じゅうがつ	October	oktober
食べ物	たべもの	food	eten
#34	University	University	Talk about college life	Stel jezelf voor en praat over studies
かい	=	are you;will you;buy;time;floor;Kai	verdieping
げんご	=	language	taal
すうがく	=	math	wiskunde
せんこう	=	major	studierichting
にはいります	=	am going to take;take;going to enroll	
のちかく	=	near	dichtbij
りょう	=	portion;portions;fee;amount;quantity;dorm	studentenhuis;hoeveelheid
キャンパス	=	campus	campus
サム	=	Sam	Sam
サークル	=	club	club
タガログご	=	Tagalog	Tagalog
チェス	=	chess	schaken
ドイツ	=	Germany;German	Duits
ドイツご	=	German	Duits
ビジネス	=	business	business
フィリピン	=	the Philippines	Filipijnen
ボランティア	=	volunteer	vrijwilliger
ボードゲーム	=	board game	bordspel
ルームメイト	=	roommate	huisgenoot
一年生	いちねんせい	first-year student	eerstejaars
三年生	さんねんせい	third-year student	derdejaarsstudent
二年生	にねんせい	second-year student	tweedejaars
何年生	なんねんせい	what school year	leerjaar
四年生	よねんせい	fourth-year student	vierdejaars
駅	えき	station	station
#35	HealthHabs	HealthHabs	Discuss healthy habits	Gebruik hoeveelheidsuitdrukkingen
あぶらっこい	=	oily	Vettige;Vettig
いくつ	=	how many	hoeveel
うんどうします	=	exercise;am going to exercise	
くだもの	=	fruit	fruit
けんこうてき	=	healthy	gezond
これから	=	from now on	vanaf nu
さとう	=	sugar	suiker
すいえい	=	swim	zwemmen
とうにゅう	=	soy milk	sojamelk
にでます	=	appear;attend;go out;leave;exit;star in	
りんご	=	apple	appel
オレンジ	=	oranges;orange	sinaasappel;oranje
ジム	=	gym	sportschool
スープ	=	soup	soep
ブロッコリー	=	broccoli	broccoli
プロテインバー	=	protein bar	proteïnereep
マラソンをはしります	=	run a marathon;run the marathon;run marathons;often run a marathon;frequently run marathons;to run a marathon	
ヨーグルト	=	yogurt	yoghurt
九つ	ここのつ	nine	negen
八つ	やっつ	eight	acht
大会	たいかい	tournament	toernooi
#36	School	School	Talk about classes	Praat over lessen
あります	=	is;they are;have;there is;has;are;there are;there will be;it is;is located;lies;there's	heb
おわります	=	ends;end	eindigt
きょうしつ	=	classroom	klaslokaal
しつもん	=	question	vragen
しめきり	=	deadline	deadline
しゅくだい	=	homework	huiswerk
じゅぎょう	=	class	les
たくさん	=	many	veel
だれ	=	who	Wiens;Wie;wie
にききます	=	listen;hear;ask;inquire;consult;taste;smell;obey	
はやく	=	fast;early;quickly;quick	vroeg;snel
スペインご	=	Spanish	Spaans
スミス	=	Smith	Smith
テスト	=	test	toets
プロジェクト	=	project	project
何曜日	なんようび	day of the week	dag van de week
山田		Yamada	Yamada
水曜日	すいようび	Wednesday	woensdag
火曜日	かようび	Tuesday	dinsdag
#37	Hobbies 2	Hobbies 2	Discuss your hobbies	Bespreek je hobby's
いそがしい	=	occupied;busy	druk
おどります	=	dance;going to dance	dans
かきます	=	draw;write	
きじ	=	article	artikel
こんや	=	tonight	vanavond
しあい	=	match	wedstrijd
たいへん	=	hard	moeilijk
たのしい	=	fun	leuk
はじまります	=	is starting;starts;begins;will start;start	begint
れんしゅう	=	practice	training
チームメイト	=	teammate	teamgenoot
バドミントン	=	badminton	badminton
バレエ	=	ballet	ballet
パフォーマンス	=	performance	voorstelling
ブログ	=	blog	blog
レッスン	=	lesson	les
九時間		nine hours	
何時間	なんじかん	how many hours	hoeveel uur
半	はん	half;thirty;and a half	half;anderhalf
四時間		four hours	vier uur
金曜日	きんようび	Friday	vrijdag
#38	Clothes 2	Clothes 2	Shop for clothes	Gebruik plaatsaanduidingen
Mサイズ		M size	maat M
くつした	=	sock	sok
こんど	=	next time	de volgende keer
たな	=	shelves;shelf	plank
てんいん	=	clerk	verkoper
ふわふわ	=	fluffy	zacht en luchtig
まず	=	first	eerst
むらさき	=	purple	Paarse;paarse
アクセサリー	=	accessory	accessoire
キラキラ	=	sparkling	glinsterend
ショッピングセンター	=	shopping center	winkelcentrum
ジーンズ	=	jeans	spijkerbroek
セーター	=	sweater	trui
パーカー	=	hoodie	hoodie
ボロボロ	=	tattered	versleten
ポイントカード	=	point card	klantenkaart
マフラー	=	scarf	sjaal
メンズ	=	men’s	heren
レジ	=	checkout	kassa
レディース	=	women's	dames
上	うえ	on top of;atop;up;on;above;upper;tops	op;boven
上がります	あがります	go up	
八千	はっせん	eight thousand	achtduizend
右	みぎ	right	rechterkant
左	ひだり	left	linkerkant
#39	Hotel	Hotel	Book and check into a hotel	Inchecken en rondkijken in hotel
うしろ	=	behind	achter
かぎ	=	key	sleutel
ぎゅうにゅう	=	milk	melk
さがします	=	will look for;am going to look for	zoek
となり	=	next door	naast
にとまります	=	to stay;to stop over;to lodge;to halt;to rest at;to stay at	
ばんごう	=	number	nummer
へや	=	room	kamer
まえ	=	front	voor
むりょう	=	free	gratis
りょこうします	=	travel;travels	reis
クレジットカード	=	credit card	creditcard
コーヒーメーカー	=	coffee maker	koffiezetapparaat
スパ	=	spa	spa
タオル	=	towel	handdoek
チェックアウトします	=	check out;checkout;check out of	
チェックイン	=	check-in	inchecken
トースト	=	toast	toast
ネットで	=	online	online
パスワード	=	password	wachtwoord
ロビー	=	lobby	lobby
一日	いちにち	day	de eerste
三階	さんがい	third floor	derde verdieping
四	し	four	vier
四階		fourth floor	vierde verdieping
#40	Grocery	Grocery	Locate ingredients in a grocery store	Vind boodschappen in de winkel
いりぐち	=	entrance	ingang
おく	=	back	achterin
おなかがすきました	=	am hungry;is hungry;are hungry;hungry	
かご	=	basket	mand
ぎゅう肉		beef	rundvlees
くろこしょう	=	black pepper	zwarte peper
こむぎこ	=	flour	bloem
こんばん	=	this evening	vanavond
じゃがいも	=	potato	aardappel
すぐ	=	soon;then;in a minute;quickly;right;immediately	direct
たまねぎ	=	onion	ui
ちゃわん	=	tea bowl	kom
にんじん	=	carrot	wortel
はし	=	bridges;chopsticks;bridge	eetstokjes;brug
ひきだし	=	drawer	lade
グラム	=	gram	gram
スプーン	=	spoon	lepel
バター	=	butter	boter
ビーフシチュー	=	beef stew	rundvleesstoofpot
一番	いちばん	the most;the best;number one;essential;most	meest
下	した	under	onder
中	ちゅう	during;in the middle;in the process of;while;inside;into	in;ruim;binnenin
肉	にく	meat	vlees;rundvlees;varkensvlees
#41	Meet Up	Meet Up	Arrange a meet-up with friends	Plan een ontmoeting met vrienden
いまから	=	from now;from now on	nu
いません	=	is not;not;is not there;isn't here;it's not;has not;have not;am not;are not;aren't here;does not have;do not have;there are no;have no;are;is not here	zijn er niet
おくれます	=	will be late	te laat
おそい	=	slow;late	laat
しんじゅく	=	Shinjuku	Shinjuku
たくさんの	=	many	veel
たち	=	and the others	Onze
にしぐち	=	west exit;west entrance	westelijke ingang
につきます	=	going to arrive	
のどこ	=	where;which part;where exactly in	
みんな	=	everyone	iedereen
よてい	=	plan	plan
をでます	=	to leave;to exit;to go out;to leave home;to leave the apartment	
アレックス	=	Alex	Alex
ターミナル	=	terminal	station
パンや	=	bakery	bakkerij
メッセージをおくります	=	send a message	
一分	いちぶ	minute	minuut
三分	さんぶん	minutes;three minutes	drie;drie minuten
乗ります	のります	ride;take	neem
六分	ろっぷん	minutes;six minutes	zesendertig;zesentwintig;zesenvijftig;zes
私たち	わたしたち	we;us	wij
#42	Healthcare	Healthcare	Seek medical help	Zoek medische hulp
おさけ	=	alcohol	alcohol
おっと	=	husband	man
しっています	=	know;knows	
しんさつしつ	=	examination room	spreekkamer
たばこをすいます	=	smoke	
ちゅうしゃじょう	=	parking lot	parkeerplaats
ちょうしがわるい	=	unwell;in poor condition;not feeling well;out of order;off;bad condition;feeling sick;not in good shape	
つかれます	=	is tiring	
つま	=	wife	vrouw
にでんわします	=	to call;to telephone;to phone	
によやくをいれます	=	make a reservation;book;reserve;schedule	
よやく	=	reservation	reservering
ファーストフード	=	fast food	fastfood
二日	ふつか	second day	tweede
今日	きょう	today	vandaag
少し	すこし	slightly;a bit;a slight;a bit of;somewhat;a little;few;a little bit of;some;slight	een beetje;beetje
#43	AnimalCafe	AnimalCafe	Enjoy an animal café	Geniet van een dieren café
いぬ	=	dog	hond
すみ	=	corner	hoek
ちゃいろ	=	brown	bruin
どうぶつ	=	animal	dier
にんき	=	popular	populair
ねこ	=	cat	kat
みみ	=	ear	oor
め	=	eye;the buds;an eye;the sprouts;the eye;a sprout;the sprout;a bud;the eyes;eyes;the bud	oog
カプチーノ	=	cappuccino	cappuccino
カメレオン	=	chameleon	kameleon
カラフルな	=	colorful	kleurrijk;bont;veelkleurig;kleurig
トマト	=	tomato	tomaat
ハムスター	=	hamster	hamster
パンケーキ	=	pancake	pannenkoek
一匹	いっぴき	one	één
三匹		three	waren;drie
二匹	にひき	two	twee
何匹		how many	Hoeveel
口	くち	mouth	mond
四匹		four	vier
#44	Zoo	Zoo	Visit the zoo	Bezoek de dierentuin
あかちゃん	=	baby	welp
あし	=	leg	been
うさぎ	=	rabbit	konijn
きりん	=	giraffe	giraf
さる	=	monkey	aap
とり	=	bird	vogel
なでます	=	pet	
ぬいぐるみ	=	stuffed toy	knuffel
やぎ	=	goat	geit
よこはま	=	Yokohama	Yokohama
わたあめ	=	cotton candy	suikerspin
キーホルダー	=	keychain	sleutelhanger
ギフトショップ	=	gift shop	cadeauwinkel
スムージー	=	smoothie	smoothie
ハンドジェル	=	hand sanitizer	handgel
パンダ	=	panda	panda
ピンク	=	pink	roze
フェンス	=	fence	hek
ベンチ	=	bench	bank
マグネット	=	magnet	magneet
五日	いつか	fifth	vijfde
週末	しゅうまつ	weekend	weekend
#45	Past Trip	Past Trip	Discuss past events	Gebruik verleden tijd werkwoorden
お母さん	おかあさん	mom;mother;your mom	moeder;mama
お父さん	おとうさん	dad;your dad;your father;father;Dad	vader;papa
かぶき	=	kabuki	kabuki
きのう	=	yesterday	gisteren
きょねん	=	last year	vorig jaar
ぎんざ	=	Ginza	Ginza
しろ	=	castle	kasteel
しんかんせん	=	Shinkansen	Shinkansen
すいぞくかん	=	aquarium	aquarium
すしや	=	sushi restaurant	sushirestaurant
ちば	=	Chiba	Chiba
てんき	=	weather	weer
なごや	=	Nagoya	Nagoya
はじめて	=	first time	voor het eerst
ぶんか	=	culture	cultuur
べんり	=	convenient	handig
りょうしん	=	parent	ouders
先月	せんげつ	last month	vorige maand
先週	せんしゅう	last week	vorige week
日本りょうり		Japanese cuisine	Japans eten
見つけます	みつけます	find;finds;will find	vinden
#46	Computers	Computers	Shop for electronics	Winkelen voor elektronica
おもい	=	heavy	zware;zwaar
かるい	=	light;lightweight	licht
でんち	=	battery	batterij
ひかります	=	lights up	licht op
もっといい	=	better	beter
インチ	=	inch	inch
キーボード	=	keyboard	toetsenbord
グレー	=	gray	grijs
ケーブル	=	cable	kabel
ゲーミング	=	gaming	gaming
スピーカー	=	speaker	luidspreker
マウス	=	mouse	muis
モニター	=	monitor	monitor
レシート	=	receipt	bon
レジぶくろ	=	plastic bag	plastic tas
ワイヤレス	=	wireless	draadloos
一万	いちまん	ten thousand	tienduizend
万	まん	ten thousand	tienduizend;twintigduizend;dertigduizend;tachtigduizend;zestigduizend;negentigduizend;vijftigduizend
前	ぜん	ago;before;front;prior	voor
安い	やすい	inexpensive;cheap;cheaper	goedkoper;goedkoop;goedkopere
買い物をします		to shop;to do shopping;to buy things	
#47	Concert	Concert	Attend a concert	Ga naar een concert
Sサイズ		size S	maat S
すきな	=	favorite	favoriet
せき	=	seat;seats;place;cough	zitplaatsen;zitplaats;hoest
たい	=	want to	willen
つかれました	=	tired	moe
てをあらいます	=	wash hands;wash one's hands;clean hands;go wash hands	handen wassen
にならびます	=	line up;stand in line;queue;be arranged;be equal to;rival;stand	
にもどります	=	return;go back;come back;revert;restore;return to	
また	=	again	weer
まんなか	=	middle	midden
もう	=	yet;now;let's;already;you've;more;again;anymore;any longer;another;oh;we've	al;meer
アーティスト	=	artist	artiest
グッズ	=	merchandise	merchandise
サイン	=	autograph	handtekening
ステージ	=	stage	podium;level
ペン	=	marker pen	stift
三千	さんぜん	three thousand	drieduizend
今夜	こんや	tonight	vanavond
出口	でぐち	exit	uitgang
外	そと	out;outside	buiten;out
#48	Seasons	Seasons	Compare seasons around the world	Gebruik bijvoeglijk naamwoorden
くらい	=	around;about;dark;approximately	donker
さきます	=	bloom;blooms;will bloom	bloeien
さくら	=	cherry blossom	sakura
さつまいも	=	sweet potato	zoete aardappel
すいか	=	watermelon	watermeloen
だんぼう	=	heater	verwarming
つけます	=	put on;turns on;turn on;I wear;wears	zet
なべ	=	hot pot;pot	hotpot;pan
ほっかいどう	=	Hokkaido	Hokkaido
みかん	=	mandarin	mandarijn
むすこ	=	son	zoon
むすめ	=	daughter	dochter
スキー	=	ski	skiën
スケート	=	skating	schaatsen
スノボ	=	snowboard	snowboarden
一月	ひとつき	January	januari
二月	にがつ	February	februari
住んでいます		live;lives	woon
四月	しがつ	April	april
夜	よる	night	nacht
#49	Apartment	Apartment	Evaluate an apartment	Beoordeel een appartement
あんぜん	=	safe	veilig
いいですね	=	that's good	Dat is goed
うるさい	=	noisy;loud;annoying	lawaaierig
きたない	=	dirty;foul	vies
このあたり	=	this area	deze omgeving
しんせつ	=	kind	vriendelijk
としょかん	=	library	bibliotheek
となりの人		neighbor	buurman
にします	=	I'll have;will have;makes;will be having;make;will go with	
に住みます		live in;reside in;dwell in;inhabit;move into;start living in	
まど	=	window	raam
やちん	=	rent	huur
クローゼット	=	closet	kast
ドア	=	door;doors	deur
三日	みっか	third;three days	3e dag;3e
三月	さんがつ	March	maart
北	きた	north	noord
大家	おおや	landlord	huisbaas
学校	がっこう	school	school
#50	WorkPlace	WorkPlace	Express workplace frustrations	Uit je frustraties op het werk
CEO		CEO	
いまの	=	last;current	huidig
おこります	=	gets angry;get angry	wordt
おそくまで	=	late	tot laat
おなじ	=	same	hetzelfde
かいしゃ	=	office;company;work;companies	bedrijf
がんばります	=	will do my best;will work hard;try my best	mijn best doen
こわれます	=	break;breaks	gaat kapot;gaan kapot
しごと	=	work;job	werk
しごとします	=	work	werk
しょうかいします	=	introduce you to;will introduce you to;introduce	introduceren
どうりょう	=	coworker	collega
べつの	=	different	ander
まじめ	=	serious	serieus
まずい	=	taste bad;bad;tastes bad;yuck	vies;vieze
やめます	=	quit;leave;stop;abstain	
よくない	=	not good;do not ... good	niet goed
インスタント	=	instant	instant
オフィス	=	office	kantoor
スキル	=	skill	vaardigheid
十階		tenth floor	tiende verdieping
昼ご飯	ひるごはん	lunch	lunch
毎日	まいにち	every day	elke dag
#51	Slow Day	Slow Day	Discuss healthy activities	Neem een rustdag
うち	=	home	thuis
おかゆ	=	rice porridge	rijstepap
かじ	=	household chore	huishouden
くすり	=	medicine	medicijn
そうじ	=	clean	schoonmaken
ねむい	=	sleepy	slaperig
もうすこし	=	a little more	nog een beetje
ゆっくりします	=	going to relax	
アラーム	=	alarm	alarm
キャンセルします	=	going to cancel	annuleer
バナナ	=	banana	banaan
ブランケット	=	blanket	deken
リモコン	=	remote control	afstandsbediening
今	いま	now	nu
明日	あした	tomorrow	morgen
#52	Sakura	Sakura	Plan to see the cherry blossoms	Plan en ga naar de kersenbloesem kijken
いけ	=	pond	vijver
えきいん	=	station attendant	stationsmedewerker
じこ	=	accident	ongeluk
すずしい	=	cool	koel
そろそろ	=	soon	bijna
どうしましょうか	=	What should we do?	wat zullen we doen
もう一つ	もうひとつ	one more	nog een
もち	=	mochi	mochi
やきそば	=	yakisoba	yakisoba
やたい	=	food stall	kraam
アナウンス	=	announcement	aankondiging
カモ	=	duck	wilde eend
モノレール	=	monorail	monorail
今週	こんしゅう	this week	deze week
八分	はちぶ	eight minutes;eighteen minutes	acht minuten
来年	らいねん	next year	volgend jaar
花見をします		going cherry blossom viewing	naar de bloesem kijken
電車	でんしゃ	train	trein
#53	Okinawa	Okinawa	Arrange a trip to Okinawa	Plan en maak een reis naar Okinawa
うみがめ	=	sea turtle	zeeschildpad
おきなわ	=	Okinawa	
けしき	=	scenery	landschap
げんきん	=	cash	contant geld
しらべます	=	will look up	zoek
つめたい	=	cold	koud
ねだん	=	price	prijs
はらいます	=	pay;going to pay;will pay;paying	
まあまあ	=	so-so	redelijk
まどがわ	=	window side	raamzijde
イルカ	=	dolphin	dolfijn
カード	=	card	kaart
サーフィン	=	surfing;surf	surfen
ストロー	=	straw	rietje
タコライス	=	taco rice	taco-rijst
パイナップル	=	pineapple	ananas
マンゴー	=	mango	mango
メール	=	email	e-mail
五月	ごがつ	May	mei
木	き	tree	boom
海	うみ	beach;ocean;seas;sea	zee
車	くるま	car	auto
#54	Cruise	Cruise	Discuss a cruise experience	Bespreek een cruise-ervaring
いろいろ	=	various	verschillende
かいがい	=	overseas	buitenland
くもり	=	cloudy	bewolkt
けっこう	=	quite;quite a bit;no thank you;pretty;quite often	best veel;best
ご飯	ごはん	meal	maaltijd
しま	=	island	eiland
そふぼ	=	grandparent	grootouders
でした	=	were;was;had;has been	was
ふくおか	=	Fukuoka	Fukuoka
ふね	=	ship	schip;boot
みずぎ	=	swimsuit	badpak
みなと	=	port	haven
アトラクション	=	attraction	attractie
クルーズ	=	cruise	cruise
ツアー	=	tour	rondleiding
ハンバーガー	=	hamburger	hamburger
ミニゴルフ	=	mini golf	midgetgolf
リゾート	=	resort	resort
ロブスター	=	lobster	kreeft
一週間	いっしゅうかん	week	week
三日間		three days	drie dagen
何日間		how many days	Hoeveel dagen
食べほうだい		all-you-can-eat	onbeperkt eten
#55	Ryokan	Ryokan	Describe a cultural travel experience	Beschrijf een reiservaring
おきゃくさん	=	guest	gast
かならず	=	certainly	zeker
きせつの	=	seasonal	seizoensgebonden
きのこ	=	mushroom	paddenstoel
さしみ	=	sashimi	sashimi
さんぽします	=	take walks;go walking;go on walks	
しんせん	=	fresh	vers
たたみ	=	tatami	tatami
ぬぎます	=	take off;remove	doe uit;doen uit;trek uit
まわり	=	surroundings	omgeving
みずうみ	=	lake	meer
むら	=	village	dorp
もり	=	forest	bos
りっぱ	=	splendid	prachtig
りょかん	=	ryokan	ryokan
スタッフ	=	staff	personeel
レビュー	=	review	recensie
二日間	ふつかかん	two days	twee dagen
入口	いりぐち	entrance	ingang
十一月	じゅういちがつ	November	november
書きます	かきます	will write	schrijven;schrijf
#56	Sick Day	Sick Day	Talk about illness	Gebruik verleden tijd ontkenningen
あけます	=	open	openen
かります	=	borrow	leen
げんきになります	=	get better	
ぜんぜん	=	not at all	helemaal niet
ちゅうもんします	=	order;place an order;request;make a request;purchase	
にがい	=	bitter	bitter
ねつ	=	fever	koorts
の中で		inside;within;among;on;in;in the midst of	in de regen
を休みます		to rest;to take a break;to be absent;to take a day off;to skip;to miss	
ティッシュ	=	tissue	zakdoekje
ノート	=	notebook	notitieboekje;notitieboek
ビタミン	=	vitamin	vitamine
マスク	=	mask	masker
メールします	=	emails;text	e-mailen
一日中	いちにちじゅう	all day long	de hele dag
何も	なにも	anything;has not ... anything;do not ... anything;does not ... anything;have not ... anything;cannot ... any;no;nothing	niets
後で	あとで	later	later
昨日	きのう	yesterday;yesterday's	Gisteren
雨	あめ	rain	regen;regenachtig;regenval
電話します	でんわします	call;calls	bellen
#57	New Home 2	New Home 2	Discuss a housewarming party	Ga naar een housewarmingfeestje
あらいます	=	wash;going to wash;washes;am going to wash	was
おくさん	=	wife	vrouw
かぐ	=	furniture	meubel
かびん	=	vase	vaas
かべ	=	wall	muur
げんかん	=	entranceway;entryway	genkan;entree
だれの	=	whose	wiens
だんなさん	=	husband	man
てづくりの	=	handmade	zelfgemaakt
はきます	=	wears;wear;put on	
もん	=	gate	poort
スリッパ	=	slipper	pantoffel
ソファ	=	sofa	bank
ダイニング	=	dining room	eetkamer
チキン	=	chicken	kip
ペット	=	pet	huisdier
今月	こんげつ	this month	deze maand
午後	ごご	afternoon;p.m;in the afternoon;p.m.;afternoons	s middags;middag
東	ひがし	east	oosten
間	あいだ	while;between	tussen;periode
#58	Hotel 2	Hotel 2	Express dissatisfaction on a trip	Uit je ontevredenheid op reis
うすい	=	bland;thin;mild;weak	dun
こうこく	=	advertisement	advertentie
じゃなかった	=	did not;wasn't;weren't	waren niet;was niet
ぬるい	=	lukewarm	lauwwarm
ほかの	=	other	ander
わるい	=	bad;poor	Slechte;slechte
カーテン	=	curtain	gordijn
ゴキブリ	=	cockroach	kakkerlak
ゴミ	=	garbage	afval
シャトルバス	=	shuttle bus	pendelbus
シャワー	=	shower	douche
シャンプー	=	shampoo	shampoo
シリアル	=	cereal	ontbijtgranen
トイレ	=	toilet	wc
ベタベタ	=	sticky	plakkerig
六階		sixth floor	zesde verdieping
四日間		four days	vier dagen
朝ご飯	あさごはん	breakfast	ontbijt
西	にし	west	westen
#59	Bad Date	Bad Date	Share disappointment with a date	Teleurstelling van een date delen
えんぎ	=	act	acteren
おばけやしき	=	haunted house	spookhuis
かたい	=	hard	taaie;taai
きっと	=	surely	zeker
けんかします	=	fight;quarrel;argue;have a fight;have an argument	ruzie maken;vechten;kibbelen;ruzie hebben
こんでいます	=	crowded	druk
さいあく	=	the worst	ergst
ざんねん	=	unfortunate	jammer
だけ	=	only;just;alone	alleen
もんだい	=	problem	probleem
ゆうえんち	=	amusement park	pretpark
ゆか	=	floor	vloer
れつ	=	line	rij
わかれます	=	am going to break up	uit elkaar
アプリ	=	app	app
シーン	=	scene	scène
ダサい	=	uncool;unfashionable;hideous;lame;ugly;dull;boring	saai;Saaie;saaie
メイン	=	main	hoofdgerecht
七日	なのか	seventh;seven days	zevende dag
今回	こんかい	this time	deze keer
六月	ろくがつ	June	juni
晩ご飯	ばんごはん	dinner	avondeten
#60	Wedding	Wedding	Attend a wedding	Ga naar een bruiloft
あいさつします	=	greets	
うつくしい	=	beautiful	Mooie
おととい	=	the day before yesterday	eergisteren
お酒	おさけ	alcohol	alcohol
かいじょう	=	venue	locatie
かしゅ	=	singer	zanger
かんどうします	=	be moved;be touched;be impressed;be deeply moved;be emotionally affected;be impressed by	ontroeren;indruk maken;raken;bewegen;inspireren
けっこんしき	=	wedding ceremony	bruiloft
しんせき	=	relative	familielid
しんぷ	=	bride	bruid
しんろう	=	groom	bruidegom
つまらない	=	boring;uninteresting	saai;onbeduidende
ひくい	=	low;lower	lage
ひどい	=	bad;dreadful;worse;terrible;horrible;awful;outrageous	Slechte
へん	=	weird;area	vreemd;omgeving
カーペット	=	carpet	tapijt
ゲスト	=	guest	gast
スピーチ	=	speech	toespraak
六日	むいか	sixth;six days	zesde
色	いろ	color	kleur
花	はな	flower	bloem
#61	Restaur.3	Restaur.3	Make plans to go out	Verbind twee bijvoeglijke naamwoorden
おくじょう	=	roof	dak
こみます	=	get crowded;gets crowded	druk
さいこう	=	best	geweldig
そうですね	=	that's right	inderdaad
にあります	=	is located	is
にがて	=	poor at;weak in;not good at;dislike;unskilled at;bad at;have difficulty with	
ふんいき	=	atmosphere	sfeer
やったー	=	Yay	Hoera
オーガニック	=	organic	biologisch
カジュアル	=	casual	casual
サイト	=	website	site
シェフ	=	chef	chef
ブラジル料理		Brazilian food	Braziliaans eten
ベジタリアン	=	vegetarian	vegetarisch;vegetariër
マンション	=	apartment complex	appartementencomplex
人気	にんき	popular	populair
入れます	いれます	am going to make;puts;put;include;will put;count;make	maken
場所	ばしょ	place	plek
日本料理	にほんりょうり	Japanese cuisine	Japans eten
#62	Returns	Returns	Return or exchange items	Artikelen retourneren of ruilen
Lサイズ		large size	Large
かくにんします	=	make	
がおすすめ	=	is recommended	aanbevolen
がら	=	pattern;texture;character;nature;disposition;appearance;frame;build;manner;style;look;design;motif;background;context;association;company;group;crowd;tendency;habit;behavior;conduct;bearing;air;aura;atmosphere;environment;surroundings;complexion;constitution;fabric;structure;form;shape;contour;outline;silhouette;figure;physique;temperament;personality;identity;reputation;status;social standing;class;rank;position;role;function;duty;responsibility;task;job;work;occupation;profession;trade;craft;skill;ability;talent;gift;knack;flair;aptitude;capacity;potential;possibility;chance;opportunity;occasion;event;incident;occurrence;happening;circumstance;condition;situation;state;phase;stage;period;era;age;time;moment;instant;point;spot;place;location;site;venue;setting;mood;tone;feeling;impression;sense;idea;concept;notion;thought;belief;opinion;view;perspective;angle;approach;method;technique;strategy;plan;scheme;project;program;system;arrangement;organization;framework;foundation;basis;principle;rule;regulation;law;ordinance;decree;edict;command;order;instruction;direction;guidance;advice;recommendation;suggestion;proposal;offer;invitation;request;demand;requirement;necessity;need;want;desire;wish;hope;expectation;anticipation;forecast;prediction;prognosis;estimate;evaluation;assessment;analysis;review;critique;commentary;explanation;interpretation;translation;rendition;version;edition;copy;reproduction;duplicate;replica;facsimile;imitation;simulation;model;prototype;example;sample;specimen;instance;case;accident;mishap;disaster;catastrophe;crisis;emergency;problem;issue;matter;concern;question;doubt;uncertainty;confusion;misunderstanding;mistake;error;fault;flaw;defect;weakness;limitation;restriction;constraint;obstacle;barrier;hindrance;difficulty;challenge;test;trial;experiment;investigation;research;study;examination;inspection;survey;appraisal;audit;feedback;comment;remark;observation;note;annotation;clarification;definition;description;account;report;narrative;story;tale;legend;myth;fable;parable;allegory;metaphor;simile;analogy;comparison;contrast;difference;similarity;resemblance;likeness;parallel;correspondence;connection;relationship;link;bond;tie;attachment;affiliation;alliance;partnership;cooperation;collaboration;teamwork;effort;endeavor;attempt;try;practice;exercise;training;education;learning;knowledge;information;data;fact;truth;reality;existence;being;entity;object;thing;item;article;product;material;substance;element;component;part;piece;segment;section;portion;fraction;percentage;ratio;proportion;amount;quantity;number;total;sum;whole;entirety;completeness;perfection;excellence;quality;standard;level;degree;grade;category;type;kind;sort;variety;species;genus;family;set;collection;assortment;range;spectrum;scale;scope;extent;magnitude;size;dimension;length;width;height;depth;volume;weight;mass;density;pressure;force;energy;power;strength;intensity;speed;velocity;acceleration;momentum;course;path;route;way;road;street;avenue;lane;alley;trail;track;line;row;column;series;sequence;while	patroon
こうかんできます	=	can exchange;can trade;can swap;can replace;can return	
しょうひん	=	product	product
すてます	=	throw away;discard;abandon;give up;dispose of	weggegooid
そうですか	=	I see	
ちがう	=	different	andere
にあいます	=	suit;match;look good on;fit;be appropriate for;look nice on;suit well	
へんぴんできます	=	return;send back;refund;exchange	
みじかい	=	short	korter;kort;Korte;korte
やわらかい	=	soft;flexible;tender	zacht
よ	=	... won't you;... you know	hoor
よかった	=	good;I am glad;better;I'm glad;were good;was good	goed
ズボン	=	pants	broek
ワンピース	=	dress	jurk
店	みせ	store;shop;stores;restaurants;restaurant;shops	store;winkel;zaak;winkels;kramen
#63	Essentials	Essentials	Shop for travel essentials	Koop reisbenodigdheden
あ	=	Ah	Ah
いちおう	=	just to be safe	voor de zekerheid
いります	=	need	nodig
からっぽ	=	empty	leeg
きつい	=	tough;difficult;hard;tight	strak;Strakke
くし	=	comb	kam
したぎ	=	underwear	onderkleding
じゅんびします	=	prepare;get ready;arrange;set up;make preparations;organize;plan	
せっけん	=	soap	zeep
ぜんぶ	=	all	alles
はいりますか	=	need	
はいりません	=	would you like to join	wil
はみがきこ	=	toothpaste	tandpasta
はブラシ	=	toothbrush	tandenborstel
ばんそうこう	=	bandage	pleister
コンディショナー	=	conditioner	conditioner
デオドラント	=	deodorant	deodorant
ドラッグストア	=	drugstore	drogisterij
バックパック	=	backpack	rugzak
八百	はっぴゃく	eight hundred	achthonderd
友だち	ともだち	friend	vriend
持って行きます	もっていきます	take;I'm bringing;bring;bringing	
来週	らいしゅう	next week	volgende week
買い物リスト	かいものリスト	shopping list	boodschappenlijstje
#64	Summer	Summer	Plan summer activities	Plan zomerse activiteiten
かきごおり	=	shaved ice	schaafijs
きがえます	=	am going to change;will change	kleed
じてんしゃに乗ります		ride a bicycle;get on a bicycle;cycle;bike;go cycling	
どこか	=	somewhere	ergens
ので	=	because;that;as;so;since;for	Omdat
ひかげ	=	shade	schaduw
ひやけどめ	=	sunscreen	zonnebrandcrème
やきとり	=	yakitori	yakitori
サングラス	=	sunglasses	zonnebril
サンダル	=	sandal	sandaal
レモン	=	lemon	citroen
ロッカールーム	=	locker room	kleedkamer
今週の		this week	deze week;van deze week
八日	ようか	eighth;eight days	achtste;de achtste
持ってきます		are bringing;will bring along;brings	
海に行きます		go to the sea	
近い	ちかい	near;close;nearer;closer;nearby	dichtbij;dichtstbijzijnde
飲み物	のみもの	drink	drankje
#65	WorkPlace2	WorkPlace2	Communicate at work	Communiceer op werk
いざかや	=	izakaya	izakaya
いただきます	=	thank you for the meal;take polite;get polite;let's eat;have polite	eet smakelijk;Eet smakelijk
うんてんします	=	drive	rijd
おかず	=	side dish;side dishes	bijgerecht
おつかれさまでした	=	you did good work;goodbye at work	goed gedaan
おはようございます	=	good morning	goedemorgen
ざんぎょうします	=	work overtime;do overtime;work late;do extra work;stay late	werk
じてんしゃ	=	bicycle	fiets
だいじ	=	important	belangrijk
ふくざつ	=	complicated;complex	complex
わかりました	=	understood;understand;understands;got it	ik begrijp het
タスク	=	task	taak
マネージャー	=	manager	manager
メニュー	=	menus;menu	menu
何日	なんにち	what day	welke dag
使います	つかいます	use;will use;take;will take;spend;uses;am going to use	gebruik
帰ります	かえります	am going home;goes home;am going back;will return home;will go home;would go home;returning;am returning;return;leaving;are going home	ga;kom
月曜日	げつようび	Monday	maandag
朝	あさ	morning	ochtend
#66	Gifts	Gifts	Use verbs for giving and receiving	Werkwoorden voor geven en ontvangen
あげます	=	give;am going to give;will give;I'm giving;will offer;gives;are going to give	geef;geeft;Geef
えほん	=	picture book	prentenboek
おい	=	nephew	neef
お茶	おちゃ	tea	thee
お金	おかね	money	geld
かわ	=	leather	leer
そふ	=	grandfather	opa
そぼ	=	maternal grandmother	oma
にんぎょう	=	doll	pop
めい	=	niece	nichtje
もらいます	=	get;will get;will receive;gets;receives;am going to get	krijg
やきます	=	bake;am going to bake;grill;are going to bake	bakken
ゆびわ	=	ring	ring
よろこびます	=	to be glad;to be pleased;to rejoice;to be delighted;to be happy;to enjoy	zich verheugen
カメラ	=	camera	camera
ギフトカード	=	gift card	cadeaubon
ハンカチ	=	handkerchief	zakdoek
パートナー	=	partner	partner
今年	ことし	this year	dit jaar
毎年	まいとし	every year	elk jaar
#67	Clinic	Clinic	Discuss your health	Bespreek je gezondheid
SNS		social media	sociale media
あたま	=	head	hoofd
うで	=	arm	arm
おだいじに	=	take care	beterschap
かぜ	=	wind;a cold;cold	verkoudheid;wind
きず	=	cut;cuts;scratch	wond;kras
くび	=	neck	nek
げんいん	=	cause	oorzaak
しばらく	=	a while	even
ちょっと	=	a little	beetje
て	=	and;so	hand;en
でんきをつけます	=	turn on the lights	
どうしましたか	=	what happened?	wat is er gebeurd
なおります	=	recover	wordt
にれんらくします	=	contact;get in touch;communicate;notify;renraku suru	
ぬります	=	apply	smeer
ほとんど	=	almost	bijna
も痛いです		also hurts;hurts too;also painful;is also painful	
やっきょく	=	pharmacy	apotheek
クリニック	=	clinic	kliniek
ストレス	=	stress	stress
痛い	いたい	sore;aches;ouch;hurts;hurt;aching;ache	pijnlijk
目	め	eye	oog
#68	Hobbies 3	Hobbies 3	Talk about your hobbies	Bespreek je hobby's
かっこよかった	=	cool	cool
さいきん	=	recently	recentelijk
すごい	=	amazing;terrific;incredible;wonderful;great;cool;awesome;great—it's	Geweldig;Geweldige
せんしゅ	=	player	sporter
たっきゅう	=	table tennis	tafeltennis
とくい	=	good at	goed
になります	=	will be;becomes;become;make;is turning;please;am going to turn;that'll be	wordt
の時		at	toen
はじめます	=	begin;start;commence;initiate;get started	
はたち	=	twenty years old	twintig jaar oud
よびます	=	will call;calls;going to call	
れんしゅうします	=	practice	
ゴルフ	=	golf	golf
ジョギング	=	jog	joggen
チーム	=	team	team
ブーツ	=	boot	laars
毎朝	まいあさ	every morning	elke ochtend
高校	こうこう	high school	middelbare school
#69	Univ.2	Univ.2	Discuss your classes	Bespreek je lessen
うけます	=	am going to take	
えらびます	=	chose;choose	kies
きびしい	=	harsh;stern;strict;severe;cruel	streng;Strenge
きょうかしょ	=	textbook	leerboek
けど	=	but;even though	maar
こんがっき	=	semester	deze semester
せいぶつがく	=	biology	biologie
ぜひ	=	definitely	zeker
だけど	=	but	maar
に聞きます		ask;inquire;listen to;hear;consult;ask for advice	
べんきょうします	=	study;will study;studies;am going to study	
らいがっき	=	next semester	volgend semester
りゅうがくせい	=	international student	buitenlandse student
オフィスアワー	=	office hours	spreekuur
クラスメイト	=	classmate	klasgenoot
グループで	=	as a group	in een groep
スケジュール	=	schedule	planning
プログラミング	=	programming	programmeren
メディアセンター	=	media center	mediacentrum
ヨーロッパ	=	Europe	Europa
何人	なんにん	how many people	Hoeveel
先生	せんせい	Mr.;Miss;Mister;Dr.;doctor;Mrs.;professors;Professor;teacher;Ms.;teachers;professor	docent;dokter
十一人		eleven people	elf
日本語	にほんご	Japanese	Japans
語	ご	language	taalles;taalleraar;taaltest;taal
#70	Pos.OfficE	Pos.OfficE	Send a package at a post office	Verstuur een pakket bij het postkantoor
おくります	=	will send;give as a present;am sending;sending;going to send	stuur
きって	=	stamp	postzegel
じゅうしょ	=	address	adres
たいんですけど	=	want to;would like to;intend to;wish to;want to borrow;would like to borrow	
てがみ	=	letter	brief
どうしよう	=	What should I do	
にもつ	=	baggage;luggage	pakket;bagage
はかります	=	measure;weigh;plan;attempt;estimate	
はこ	=	box	doos
はります	=	stick;paste;put up;stretch;spread;affix;post;apply;tighten;extend;attach	
ほうほう	=	method	methode
ゆうびんきょく	=	post office	postkantoor
わかりません	=	does not know;I don't understand	
キログラム	=	kilogram	kilogram
サイズ	=	size	maat
テープ	=	tape	tape
プリントできます	=	can print;able to print;can be printed;is able to print;can be printed here;can print labels;can print at the convenience store	
ラベル	=	label	label
七	しち	seven	zeven
三百	さんびゃく	three hundred	driehonderd
名前	なまえ	name	naam
四日	よっか	fourth;four days;4th	vierde
#71	New Home 3	New Home 3	Describe your neighborhood	Bespreken meubels kopen nieuw huis
いつでも	=	anytime	altijd
かけます	=	can draw	hang
すいはんき	=	rice cooker	rijstkoker
せい	=	fault;made	gemaakt in
ちょうどいい	=	just right;perfect;exactly right;suitable;appropriate;fitting;right size	precies goed
どれ	=	which one	welke
ひつよう	=	necessary	nodig
タンス	=	dresser	kast
ダンボール	=	cardboard	karton
テーブルクロス	=	tablecloth	tafelkleed
トラック	=	truck	vrachtwagen
十万	じゅうまん	one hundred thousand	honderdduizend
家具屋	かぐや	furniture store	meubelwinkel
短い	みじかい	shorter;short;brief	Korte;Kort
近所	きんじょ	neighborhood	buurt
長い	ながい	long	lang;langste;Lang;lange;langer;Lange
開けます	あけます	opens;open;unlocks	opent
#72	Surp Party	Surp Party	Plan a surprise party	Verrassingsfeest plannen
うた	=	song	lied
じゅんび	=	preparation	voorbereiding
てつだいます	=	help	helpen
に立ちます		stand;rise;get up;take a position;be established;stand behind	sta;Sta
ふうせん	=	balloon	ballon
サプライズ	=	surprise	verrassing
デコレーション	=	decoration	decoratie
トレーニング	=	job training	training
ロウソク	=	candle	kaars
十日	とおか	tenth;ten days	tiende
早く	はやく	quickly;soon;sooner;fast;early;faster;quicker	vroeg;eerder
電気をけします		turn off the light;switch off the light;extinguish the light;cut the power;shut off the electricity;turn off the electricity;switch off the electricity;extinguish the electricity	uitdoen
#73	Comp. Trip	Comp. Trip	Share a favorite trip memory	Een bedrijfsreis bespreken
いつか	=	someday	ooit
おかしや	=	pastry shop	snoepwinkel
おまもり	=	charm	geluksamulet
おもいでを作ります		make memories;create memories;build memories;create good memories	maakt
が多い		many;much;numerous;a lot of;plenty of	veel
きもの	=	kimono	kimono
しゃいんりょこう	=	company trip	bedrijfsreis
とくに	=	especially	vooral
にわ	=	garden;yard;two	tuin
に入ります		enter;am going to join	binnen;binnen te gaan
みんなで	=	together	met z’n allen
ガイドブック	=	guidebook	reisgids
マッサージをします	=	to give a massage;to massage;to do a massage	doe;Geef
ルームサービス	=	room service	roomservice
九日	ここのか	ninth;nine days	negende
味	あじ	taste	smaak
温かい	あたたかい	warm;hot	warme;warm
行ってらっしゃい	いってらっしゃい	Have a good trip	Ga goed heen en terug
#74	Family Biz	Family Biz	Describe restaurant jobs	Beschrijf je familiebedrijf
うすく	=	thinly	dun
お客さん	おきゃくさん	customer	klant
かんりします	=	manage;administer;control;oversee;supervise;organize	beheer;beheert
きゅうり	=	cucumber	komkommer
どんぶり	=	donburi	donburi
にきがえます	=	change clothes;get changed;dress;put on different clothes	verkleed
わりびき	=	discount	korting
を閉めます		close;shut;fasten;lock;draw	sluit
アルバイト	=	part-time job	bijbaan
シフト	=	shift	dienst
ソフトドリンク	=	soft drink	frisdrank
以外	いがい	except;aside from;except for;other than	behalve
学生	がくせい	student	student
毎週	まいしゅう	every week	elke week
考えます	かんがえます	consider;will think about it;thinks	nadenken
#75	Photo cont	Photo cont	Join a photo contest	Aan fotowedstrijd deelnemen
きめます	=	decide;determine;choose;settle;set;fix	beslist
けします	=	erase;turn off;extinguish;delete;cancel	verwijder
けっか	=	result;outcome;consequence;effect;conclusion	resultaat
こうさてん	=	intersection	kruising
さんかします	=	participate;join;take part	bijgewoond
しょう	=	let's	prijs
しろくろ	=	black-and-white	zwart-wit
なるほど	=	I see	ik begrijp het
はくぶつかん	=	museum	museum
ふつう	=	normal;usual;ordinary;regular;common;average;everyday;typical	gewone
ほし	=	star	ster
アイデア	=	idea	idee
テーマ	=	theme	thema
フォトコンテスト	=	photo contest	fotowedstrijd
二十日	はつか	twentieth	twintigste
位	くらい	level;around	plaats
出します	だします	dispenses;gives out;will dispense;will give out;will take out;takes out;serves	indienen
前の		previous	vorige
学びます	まなびます	learns	Leer;leer
空	そら	sky	lucht
花火	はなび	firework	vuurwerk
見せます	みせます	will show;shows;show	laten zien
#76	Socl Media	Socl Media	Set up your account	Social media platforms gebruiken
うれしい	=	happy;glad;pleased;delighted	blij
えもじ	=	emoji	emoji
おてつだいしましょうか	=	Shall I help you?	Zal ik u helpen?
かんたん	=	easy	makkelijk
がわかりません	=	do not understand;do not know;cannot understand;am not sure;do not get it;could not find out	begrijp;begreep
が来ます		come;arrive;reach;appear;will come	komt
さびしい	=	isolating;lonely	eenzaam
つながります	=	connect;link;be connected;be linked;relate;tie;join;lead to;result in;associate	verbind;verbindt
とうこう	=	post	post
とりあえず	=	for now	voorlopig
どんなこと	=	what kind of things	wat voor dingen
にっき	=	diary	dagboek
に変えます		change to;switch to;convert to;replace with;change	verander
はがき	=	postcard	ansichtkaart
はじめての	=	first	eerste
まご	=	grandchild	kleinkind
むかし	=	long ago	vroeger
むかしの	=	old	oud
アイコン	=	icon	pictogram
アカウント	=	account	account
フォローします	=	follow;subscribe;add as a friend	Volg;volg
ボタン	=	button;buttons	knop
意外と		surprisingly	verrassend
押します	おします	push	
長く		long	lang
#77	Outdoors	Outdoors	Plan a camping trip	Buitenshuis plannen maken
がいい	=	prefer	is beter
きせつ	=	season	seizoen
におい	=	smell	geur
キャンプ	=	camping	kamperen
シーフード	=	seafood	zeevrucht
ハイキング	=	hiking	wandelen;wandeling
ハンバーグ	=	hamburg steak	hamburgersteaks
バーベキュー	=	barbecue	barbecue
ピクニック	=	picnic	picknick
午前	ごぜん	in the morning;a.m.;a.m;morning	's ochtends
川	かわ	river	rivier
広場	ひろば	town square;square;forum	plein
早い	はやい	quick;soon;fast;early;quickly	vroeg;Vroeg
楽しみます	たのしみます	enjoy;look forward to;have fun;take pleasure in;have a good time;enjoy oneself	genieten
泊まります	とまります	will stay	
#78	Cas Dining	Cas Dining	Choose a restaurant	Bestellen bij een restaurant
おごり	=	treat	traktatie
おなかがいっぱい	=	full	vol
こい	=	strong;full;powerful;intense;thick;thicker;concentrated;come;rich	koi
すっぱい	=	sour	Zuur;Zure
とろとろ	=	thick and creamy	romig
どちらがいいですか	=	which sounds good	Welke is beter?
ぶどう	=	grape	druif
めん	=	face;mask;noodle;soup;cotton;broth;aspect;side;noodles	katoenen
ようしょく	=	Western-style food	westerse gerechten
オムライス	=	omelet rice	omurice
スペシャル	=	special	specialiteit
ソーセージ	=	sausage	worst
ドリンクバー	=	self-service drink bar	drankbar
ドレッシング	=	dressing	dressing
ファミレス	=	diner	familierestaurant
マヨネーズ	=	mayonnaise	mayonaise
レタス	=	lettuce	sla
半分	はんぶん	half	helft
注文します	ちゅうもんします	order;orders	
辛い	からい	spicy;tough	Pittig;Pittige
#79	Thrift Shp	Thrift Shp	Share your vintage finds	Winkelen bij een kringloopwinkel
いらない	=	unnecessary	onnodig
かたづけます	=	will clean up;going to tidy up	ruim ... op
がはやっています	=	to be popular;to be in fashion;to spread;to thrive;to be prevalent;to be trendy;to be fashionable	is in de mode;zijn in de mode
が多すぎます		are too many	zijn te veel
さっか	=	author	schrijver
しょうせつ	=	novel	roman
のほうが	=	is more	leuker
より	=	more;than;over;since;from;greater	dan
ギター	=	guitar	gitaar
デジタル	=	digital	digitaal
ファッション	=	fashion	mode
ベルト	=	belt	riem
リサイクルショップ	=	second-hand store	kringloopwinkel
レコード	=	record	plaat
レトロな	=	retro	retro
中古	ちゅうこ	used	tweedehands
冊	さつ	counter for books;volumes	boek;boeken
売ります	うります	sell;sells	verkoop
少ない	すくない	little;few;not much;not many;meager;small;less	weinig
年代	ねんだい	generation	tijdperk;periode;generatie;eeuw;decennium;leeftijdsgroep
時計	とけい	clock	horloge
赤い	あかい	red;a red;redder	rood;rode;Rode
#80	office 2	office 2	Ask about a deadline	Samenwerken met collega's aan projecten
しょるい	=	document	document
じゅうよう	=	important	belangrijk
までに	=	by;before	tegen
まとめます	=	summarize;compile;organize;collect;put together;conclude;wrap up;record	samenstellen
カレンダー	=	calendar	kalender
コピーします	=	copy;make a copy	kopieert
サインします	=	sign;signs	tekenen
データ	=	data	gegeven
ホチキス	=	stapler	nietmachine
メールアドレス	=	email address	e-mailadres
レポート	=	report;reports	rapport
代	よ	fare	kosten
何か	なにか	something;any;anything;some;what	iets
入力します	にゅうりょくします	enter	voeren in;voer in
十四日	じゅうよっか	fourteenth	veertiende
夕方	ゆうがた	evening	avond
映画	えいが	movie	film
閉めます	しめます	will close	sluit
#81	Ski Trip	Ski Trip	Pack for your ski trip	Skireis plannen
あつまります	=	gather;assemble;collect;meet;convene;meet up;come together	verzamelen zich
かぶります	=	wear;wears;will wear	Draag;draag;draagt
くま	=	bear	beer
くれませんか	=	would you mind ... for me;will you please;could	kun je
しゅっぱつします	=	depart;leave;start;set out;take off	vertrek
しょしんしゃ	=	beginner	beginner
すばらしい	=	excellent;wonderful;great;lovely;stunning;marvelous;fantastic;terrific	geweldige
のけいけん	=	experience	ervaring
びん	=	bottle;flight;mail;chance;opportunity;jar;vial;container;flight number;train number	Fles;Flessen
ようひん	=	equipment	uitrusting
ゴーグル	=	goggle	goggles
スキー場	スキーじょう	ski resort	skigebied
ヘルメット	=	helmet	helm
半日	はんにち	half a day	een halve dag
天気	てんき	weather	weer
安全	あんぜん	safe	veilig
寒い	さむい	cold;colder;a cold	koud
暖かい	あたたかい	warm;hot	warme
気をつけます	きをつけます	be careful;pay attention;take care;watch out;be cautious;avoid danger	voorzichtig;voorzichtig zijn
雪	ゆき	snow	sneeuw
#82	Movies	Movies	Talk about favorite movies	Favoriete filmgenres bespreken
あたまが大きい		big-headed;large-headed	groot hoofd
かいじゅう	=	kaiju	reusachtig monster
かなしい	=	sad	verdrietig;verdrietige
かみが長い		has long hair	lang haar
きもちわるい	=	disgusting;gross;unpleasant;sick;creepy;nauseating	vieze;vies
こえが大きい		loud voice	luid stem
じょゆう	=	actress	actrice
せが高い		tall	lang
わかい	=	young	jong;jonge;jonger
わくわくする	=	be excited;be thrilled;be delighted;look forward to;be eager;exciting;thrilling	spannend
わらいます	=	laugh;smile;chuckle;giggle	lach
アジア	=	Asia;Asian	Azië;Aziatische;Aziatisch
スペイン	=	Spain;Spanish	Spaans
一年中	いちねんじゅう	all year round	het hele jaar door
休みの日		day off	vrije dag
外国	がいこく	foreign country	buitenland
女の人	おんなのひと	woman	vrouw
好き	すき	like	leuk
明日の夜		tomorrow night	morgenavond
映画館	えいがかん	movie theater	bioscoop
男の人	おとこのひと	man	man
目が大きい		big-eyed	grote ogen hebben
#83	FUKUOKA	FUKUOKA	Describe city scenes	Ontdek Fukuoka's attracties
かんこうち	=	tourist spot	toeristische plek
きゅうしゅう	=	Kyushu	Kyushu
こうがい	=	suburb	voorstad
しゅっちょう	=	business trip	zakenreis
じょう	=	castle	kasteel
すもう	=	sumo	sumo
とおり	=	street	straat
とんこつラーメン	=	tonkotsu ramen	tonkotsu ramen
にゅうじょうりょう	=	admission fee	toegangsprijs
びじゅつ	=	art	kunst
むしあつい	=	humid;sultry;muggy;sticky;oppressive	benauwde;benauwd
タワー	=	tower	toren
ドーム	=	dome	koepelstadion
三十日	さんじゅうにち	30th day	dertigste
冬	ふゆ	winter	winter
十七日	じゅうしちにち	seventeenth day;seventeenth of the month;the 17th;on the 17th	zeventiende
市	し	city	stad
昨日の夜		last night	gisterenavond
昼間	ひるま	daytime	overdag
科学	かがく	science;scientific;sciences	wetenschap;Wetenschap;Wetenschaps
黒い	くろい	black	Zwarte
#84	Bookstre 2	Bookstre 2	Ask about books and supplies	Koffie bestellen in boekwinkel
えんぴつ	=	pencil	potlood
くない	=	isn't	niet
けいざい	=	economy	economie
けしごむ	=	eraser	gum
こわい	=	scary;scared of	eng;Eng
じしょ	=	dictionary	woordenboek
そう	=	seem;that way;that;right;so;true;correct;that's	lijkt;zo;schijnen;schijnt
におります	=	to be;to exist;to stay;to reside;to be located;to get off;to descend	op;ben op
にきょうみがあります	=	am interested in	interesse hebben in
ほんやく	=	translation	vertaling
れきし	=	history	geschiedenis
をもどします	=	return;put back;restore;give back;bring back	zet terug
エスカレーター	=	escalator	roltrap
バニラ	=	vanilla	vanille
座ります	すわります	sit;will sit;sits;sitting	
文学	ぶんがく	literature	literatuur
本屋	ほんや	bookstore	boekwinkel
毎月	まいつき	every month	elke maand
紙	かみ	paper	papier
#85	Wedding 2	Wedding 2	Talk about your uncle	Naar een familietrouwfeest gaan
おじ	=	uncle	oom
おば	=	aunt	tante
かんぱいします	=	cheers;toast;bottoms up;make a toast	proosten
こうかんします	=	exchange;swap;trade;interchange;replace	wissel
さくらんぼ	=	cherry	kers
どれぐらいの	=	how much	hoeveel
なげます	=	throw;toss;cast;pitch;hurl	gooi;gooien
ひさしぶりです	=	been a long time	Lang niet gezien
ウェディングケーキ	=	wedding cake	bruidstaart
チーズ	=	cheese	kaas
ブーケ	=	bouquet	boeket
リハーサル	=	rehearsal	repetitie
大人	おとな	adult	volwassene
子ども	こども	child	kind
待ちます	まちます	wait;will wait;waits	wacht
歳	とし	year old	twintigste;jarige;jaar
白い	しろい	white	Witte
#86	HOTEL 3	HOTEL 3	Compare hotel options	Hotelopties vergelijken
あずかります	=	to take care of;to look after;to keep;to hold onto;to receive;to take charge of;to store;to keep safe	bewaart
いくつか	=	some	enkele
いなか	=	countryside	platteland
うけとります	=	receive;accept;get;take;obtain;pick up	ontvangt;ontvang
お得	おとく	bargain;good deal;advantageous;profitable;economical;value for money;beneficial;worthwhile	voordelig
きんえん	=	non-smoking	niet-roken
きんこ	=	safe	kluis
ここちいい	=	comfortable	comfortabel
せんたく	=	laundry	wassen
それなら	=	in that case	Als dat zo is
ひょうか	=	evaluation	beoordeling
ふべん	=	inconvenient	onhandig
アイロン	=	iron	strijkijzer
アプリけっさい	=	app payment	betalen via een app
キャンペーン	=	campaign	campagne
コピーき	=	copy machine	kopieermachine
フロント	=	front desk	receptie
ミーティングルーム	=	meeting room	vergaderruimte
二十七日	にじゅうしちにち	27th day	zevenentwintigste
四人	よにん	four	Vier
急ぎます	いそぎます	hurry;rush;hasten;speed up;be in a hurry	haasten;haast
旅行	りょこう	trip	reis
#87	Meeting	Meeting	Ask about meeting delays	Bespreek vertragingen beleefd
うら	=	back	achterkant
が足りません		there aren't enough;does not have enough;there isn't enough	zijn niet genoeg;is niet genoeg
こうじょう	=	factory	fabriek
さっき	=	just now	net
しつれいします	=	pardon me;excuse me;I will be leaving	afscheid
しょうしょうお待ちください		please wait a moment	wilt u even geduld hebben
しりょう	=	material	document
それでは	=	Well then	dan
どうぞ	=	here you go	alstublieft
について	=	about;regarding	over
めいし	=	business card	visitekaartje
インド	=	India	Indiase
タイ	=	Thailand;Thai	Thais
メキシコ	=	Mexico	Mexico
二十九日	にじゅうくにち	twenty-ninth day;29th day;twenty-ninth of the month;29th of the month;twenty-ninth date;29th date;on the twenty-ninth;by the twenty-ninth;until the twenty-ninth	29e
会社	かいしゃ	company	bedrijf
会社員	かいしゃいん	the office worker;an office worker	kantoormedewerker
年	とし	years;age;year	derdejaarsstudent;jaar;vierdejaarsstudent;tweedejaarsstudent;eerstejaarsstudent
枚	まい	sheet	stuks
空いています		available	vrij
終わり	おわり	end	einde
返事します	へんじします	reply;answer;respond	antwoorden
#88	Exams	Exams	Talk about exams	Examstrategieën bespreken
おきて	=	get up	opstaan
おぼえます	=	will memorize	onthoud
かもく	=	subject	vak
がしんぱい	=	worry;concern;anxiety;care;fear;worry about	me zorgen maken over
きまつしけん	=	final exam	eindexamen
こたえ	=	answer	antwoord
せいせき	=	grade	cijfer
たんご	=	word	woord
どういういみですか	=	What does it mean;What is the meaning;What do you mean;What kind of meaning is it;What does that mean	Wat betekent het?
ひるねします	=	take a nap;nap;have a nap;doze off;rest;take an afternoon nap	doen;doe
ふくしゅうします	=	review;revise;go over;study;practice	herhaal;Herhaal
やっと	=	finally	eindelijk
ページ	=	page	pagina
問題	もんだい	the problem;the problems;question;questions;a problem;matter;issues;matters;issue;difficulties;task	probleem;opgaven
外国語	がいこくご	foreign language	vreemde taal
大学	だいがく	university	universiteit
教えます	おしえます	teach;teaches	vertellen
正しい	ただしい	right;true;valid;correct;good;proper	correct
漢字	かんじ	kanji	kanji
#89	Video Call	Video Call	Ask about background noise	Videogesprek voeren
かみなり	=	thunder	donder
がめん	=	screen	scherm
こえ	=	voice	stem
しょうぼうしゃ	=	fire truck	brandweerwagen
だいじょうぶですよ	=	all right	het is oke
ふります	=	to fall;to pour;to rain;to snow;to sprinkle	valt;sneeuwt
ようじ	=	stuff to do	zaak
サイレン	=	siren	sirene
マイク	=	mic	microfoon
ミュートにします	=	mute;silence;turn off sound;put on mute;mute someone	zet ik op mute
ログイン	=	login	login
十一日	じゅういちにち	eleventh day	elfde
強い	つよい	strong	sterk;sterkste;feller
終わりにします		end;finish;conclude;stop;wrap up;call it a day	beëindigen
聞こえます	きこえます	hear;can hear	horen
見えます	みえます	are visible;appear;see;look;sees;is visible;looks	te zien
通ります	とおります	pass by	ga;passeer
部屋	へや	room	kamer
音が大きい		loud	luid
音が小さい		low volume;quiet sound;soft sound;faint sound;low sound;quiet volume	is zacht
風	かぜ	wind	wind
#90	Wrking Out	Wrking Out	Talk about exercise habits	Sport en activiteiten bespreken
あせをかきます	=	sweat;perspire;sweat a lot;work up a sweat	zweet
おふろに入ります		take a bath;enter the bath;get in the bath;have a bath	ga in bad
かた	=	shoulder	schouder
しゅみ	=	hobby	hobby
とびます	=	fly;flies	Vlieg;vlieg;vliegt
によります	=	depend on;be due to;be caused by;result from;according to;stop by;drop by;go to;visit	langs
アメフト	=	football	American football
ストレッチ	=	stretch	stretching
ダンベル	=	dumbbell	dumbbell
回	かい	time;times;episode	keer
天気がいい		nice weather	mooi weer
室内	しつない	indoors	binnenruimte
暑い	あつい	hot;hotter	heet;hete
行って		go	gaan
走ります	はしります	runs;run;drive;will run;drives	
運動	うんどう	exercise	oefening
重い	おもい	heavy	zwaar
#91	Oshougatsu	Oshougatsu	Share New Year traditions	Japanse nieuwjaarsgebruiken bespreken
あけましておめでとうございます	=	Happy New Year	Gelukkig nieuwjaar
いのります	=	pray	bid;bidden
おおそうじ	=	big cleaning	grote schoonmaak
おせち料理	おせちりょうり	New Year dishes	osechigerechten
お正月	おしょうがつ	New Year's	Nieuwjaar
かざります	=	decorate;display;adorn;embellish;ornament	versier
が楽しみです		looking forward to	uitkijken naar
しゅうかん	=	custom	gewoonte
すごします	=	spend;pass;live;get through;endure;spend time	brengen;breng
ぞうり	=	zōri	zōri
ねがいごと	=	wish	wens
ねんがじょう	=	New Year's card	nieuwjaarskaart
ばんぐみ	=	program	programma
もくひょう	=	goal	doel
写真	しゃしん	photo	foto
初め	はじめ	beginning	begin
去年	きょねん	last year	vorig jaar
日の出	ひので	sunrise	zonsopgang
着ます	きます	puts on;wear;wears;put on	draag
言います	いいます	tell;tells;say;says;insist	zeg
#92	Travel 3	Travel 3	Plan your trip	Internationale reis coördineren
それから	=	after that;and then;then	daarna;Daarna
ぞう	=	elephant	olifant
と思います		I think	denk ik
についていきます	=	follow;keep up with;go along with;keep pace with;follow behind;go after	volgen
る	=	you're;are you;is that;are they;I'm;is it;he's;have;am I;has;is she;is he;she's	ga;voelt;liep;kost;zijn;is;voel;Laten;zoek
エビ	=	shrimp	garnaal
ココナッツ	=	coconut	kokosnoot
シンガポール	=	Singapore	Singapore
マレーシア	=	Malaysia	Maleisië
ライドシェア	=	rideshare	carpooling
国	くに	country	land
寝ます	ねます	go to bed;go to sleep;goes to sleep;will go to sleep;sleep;sleeps;am going to bed	
服	ふく	clothes	kleren
東南アジア	とうなんアジア	Southeast Asia;South East Asia;Southeastern Asia	Zuid-Oost Azië
海外	かいがい	abroad	buitenland
誰	だれ	who	wie
#93	Bank	Bank	Open a bank account	Een bankrekening openen
あさって	=	the day after tomorrow	overmorgen
いる	=	be	zijn
うんてんめんきょ	=	driver's license	rijbewijs
ぎんこう	=	bank	bank
こうざ	=	bank account	rekening
すいています	=	be empty;be uncrowded;be free;be vacant;be less crowded	leeg
たいてい	=	usually	meestal
ちょきんします	=	save money;deposit;put aside money;save up	sparen;spaar
りゅうがくします	=	am going to study abroad	studeren in het buitenland
メモをとります	=	take notes;make a note;jot down notes;write down notes;note down;take a note	maak
三十万		300;000;three hundred thousand	dertigduizend
十九日	じゅうくにち	nineteenth;nineteen days	Negentiende dag;negentiende dag
南	みなみ	south	zuid
四分	しぶん	four minutes	vier minuut
百万	ひゃくまん	million	miljoen
閉まります	しまります	will close;closes;close	
#94	Research	Research	Share your opinions	Onderzoeksproces bespreken
いけん	=	opinion	mening
けんきゅう	=	research	onderzoek
しょうらい	=	future	toekomst
せんそう	=	war	oorlog
その時	そのとき	that time	dat moment;die tijd
た	=	did	de
どう思いますか		what do you think of;what do you think	wat vind je ervan
はっぴょう	=	presentation	presentatie
ろんぶん	=	paper	essay
リンク	=	link	link
古代	こだい	ancient	oudheid
文化	ぶんか	culture	cultuur
新聞	しんぶん	newspaper	krant
生活	せいかつ	life	leven
自分で	じぶんで	by oneself	zelf
課題	かだい	assignment	opdracht
返します	かえします	will return;returns;return	teruggeven
#95	BBQ	BBQ	Offer food and drinks	BBQ organiseren
いえいえ	=	no;not at all;no no;don't mention it;you're welcome	Graag gedaan
ごちそうさまでした	=	Thank you for the meal	Bedankt voor de maaltijd
つれてきます	=	bring someone;take someone;lead someone;accompany someone;bring along;come with	brengt;breng
はだいじょうぶです	=	okay	niet nodig
ふくろ	=	bag	zak
へようこそ	=	welcome to	welkom
むかえに行きます		go to meet;go to pick up;go to welcome;go to fetch	ophalen
れんらくさき	=	contact information	contactgegevens
をどうぞ	=	please have	alstublieft
インフルエンザ	=	the flu	griep
ピーマン	=	bell pepper	paprika
初めて	はじめて	first	de eerste keer;eerste;voor het eerst
大学生	だいがくせい	university student	universiteitsstudent
夫	おっと	husband	man
妻	つま	wife	vrouw;echtgenote;echtgenotes
火をつけます	ひをつけます	light a fire;ignite;set fire to;start a fire	aan;aansteken
知り合い	しりあい	acquaintance	bekende
計画します	けいかくします	plan;schedule;organize;arrange	plannen;plan
#96	Dietary	Dietary	Ask about menu items	Bespreek dieetwensen
いらっしゃいませ	=	welcome	welkom
おなか	=	stomach	buik
ざいりょう	=	ingredient	ingrediënt
じょうほう	=	information	informatie
の味がします		tastes like;has the flavor of;tastes of;has a taste;tastes	heeft de smaak van
は入っていますか		is included;does it contain;is it in;does it have;contains	Zit er
ひょうじ	=	label	waarschuwing
わりびきけん	=	discount coupon	kortingsbon
サービス	=	service	service
ビーガン	=	vegan	veganistisch
ピーナッツ	=	peanut	pinda
何色	なにいろ	what color	Welke kleur
別の		another	ander
店員	てんいん	clerk	winkelmedewerker
店長	てんちょう	store manager	winkelmanager
来て		come	komen
気分が悪い	きぶんがわるい	feeling sick;am feeling unwell;feel ill;feel unwell;have felt unwell;have felt ill;I'm feeling sick	ziek
遅い	おそい	slow;late;delayed;slowly	traag
#97	Who Dun It	Who Dun It	Describe what you heard	Een plaats delict bespreken
きいろい	=	yellow	Gele;gele;geel
つかまえます	=	catch;capture;arrest;seize	gevangen;vangt;vangen
どろぼう	=	thief	dief
なります	=	are getting;becomes;become;grow;will get;feel;get;gets;is going to be;feels;turning	wordt
にげます	=	escape;run away;flee;avoid;get away;leave	
に気づきます		notice;realize;become aware of;recognize;perceive;become conscious of;detect;spot	merkt;Merk
よかったです	=	I am glad;were good;was good;was nice;thank goodness	goed
ろうか	=	hallway	gang
われています	=	be broken;be cracked;be split;be fractured;be damaged;be shattered	gebroken
バイク	=	motorbike	motorfiets
変	へん	strange	vreemd
急に	きゅうに	suddenly	plotseling
持っています		have;has	heb
最初は		at first	in het begin
誰か	だれか	someone;who ... is;somebody;anybody;anyone;who ... are;any	iemand
#98	meeting 2	meeting 2	Arrange the meeting room	Zakelijke bijeenkomst organiseren
あんないします	=	guide;show;lead;inform;conduct;escort;accompany	rondleiden
かいぎ	=	meeting	vergadering
じこしょうかいをします	=	introduce oneself;self-introduction;to introduce oneself;do self-introduction;give a self-introduction	zelfintroducties;zelfintroducties doen;zelfintroductie
じゅうでんします	=	charge;recharge;power up	opladen
じゅんびできました	=	ready	klaar met de voorbereiding
つうやく	=	interpret	tolken
もちろん	=	of course	natuurlijk
スポンサー	=	sponsor	sponsor
スライド	=	slide	slide
ネパール	=	Nepal	Nepal
ノートパソコン	=	laptop	laptop
プロジェクター	=	projector	projector
メンバー	=	member	lid
リーダー	=	leader	leider
受付	うけつけ	reception desk	receptie
本社	ほんしゃ	headquarters	hoofdkantoor
来る	くる	come	komen
温度	おんど	temperature	temperatuur
送ります	おくります	will send;sends;send	
#99	Reunion	Reunion	Describe changes at home	Oude vrienden ontmoeten
お兄さん	おにいさん	older brother	broer
お姉さん	おねえさん	older sister	oudere zus
かみがた	=	hairstyle	kapsel
かんごし	=	nurse	verpleegkundige
けいさつかん	=	policeman	politieagent
けっこんしています	=	married	getrouwd zijn
でおります	=	be;exist;stay;remain;am;is;are;get off;disembark;alight	stap uit bij;stapt uit;stapt uit bij;stap uit
に近い		near;close to;adjacent;close by;nearby	dicht bij
のみほうだい	=	all-you-can-drink	all-you-can-drink
ほんとうですか	=	Really?	is het echt zo?
めがね	=	glasses	bril
を変えます		change	Verander;verandert;verander
イヤリング	=	earring	oorbel
カクテル	=	cocktail	cocktail
コーデ	=	outfit	outfit
今朝	けさ	this morning	vanmorgen
南アメリカ	みなみアメリカ	South America	Zuid-Amerika
行った		go	gaan
金	きん	gold	goud
青い	あおい	a blue;pale;blue;bluer	blauw
#100	Festivals	Festivals	Talk about past holidays	Bespreek festivaltradities
いしょう	=	costume	kleding
おいわい	=	celebration	viering
がっき	=	instrument	muziekinstrument
ことがあります	=	has;there is one thing;have	ooit
ことがありません	=	have never;has never;have not	nog nooit
ことはありますか	=	have you ever;do ... have ... ?	ooit
そして	=	then	en
たとえば	=	for example	bijvoorbeeld
つれていきます	=	take someone;bring someone;lead someone;accompany someone	neem
でんとうてき	=	traditional	traditioneel
で何と言いますか		How do you say;What do you call;How is it said;How do you express;What is it called;What do you call it	Hoe zeg je
イタリア	=	Italy;Italian	Italië
中に		inside;among;into;during;in	binnenin
中東	ちゅうとう	Middle East	Midden-Oosten
今度	こんど	next time	volgende keer
何月	なんがつ	which month	maand
屋台	やたい	food stall	kraam
料理	りょうり	cuisine;dish	keuken;gerecht
歌	うた	song	lied
特別	とくべつ	special	speciaal
甘い	あまい	sweet;sweeter	zoet;zoete
#101	healthy2	healthy2	Describe a healthy breakfast	Gezonde keuzes bespreken
えいよう	=	nutrition	voeding
おすすめの	=	recommended	aanbevolen
お手洗い	おてあらい	restroom	toilet
たいいく	=	PE;P.E.	lichamelijke opvoeding
できるだけ	=	as much as possible	zo veel mogelijk
ない	=	haven't;do not;n't;no;can't;will not;is gone;hasn't;aren't;without;am not;ll;didn't;isn't;have not;are not;do not have;nothing;not;doesn't;never;hadn't	niet;geen
のいっしゅです	=	type	soort
ひかえます	=	refrain;hold back;abstain;avoid;cut down on;reserve;prepare;wait;be moderate	vermijden
カロリー	=	calorie	calorie
キロメートル	=	kilometer	kilometer
スタジオ	=	studio	studio
ダイエット	=	diet	dieet
リットル	=	liter	liter
体にいい	からだにいい	good for the body;healthy;beneficial to the body;good for health;good for you	goed voor het lichaam
体に悪い	からだにわるい	bad for the body;unhealthy;harmful to the body;detrimental to health;unhealthy for the body;bad for health	slecht voor het lichaam
体重	たいじゅう	body weight	lichaamsgewicht
必ず	かならず	definitely	altijd
焼肉	やきにく	yakiniku	yakiniku
続けます	つづけます	continue;continues	
選びます	えらびます	select	
#102	Xchg Stdnt	Xchg Stdnt	Describe your school uniform	Aanpassen aan cultuurverschillen
じゅく	=	cram school	bijschool
せいふく	=	uniform	uniform
たいそうふく	=	gym clothes	gymkleding
では	=	well then;at;during;in;by;well	Dan
ならびます	=	will wait in line;will form a line;will queue;line up	sta in de rij;staan in de rij;staat in de rij
びっくりしました	=	be surprised;was surprised;get surprised;got surprised;be startled;was startled;be shocked;was shocked;be amazed;was amazed;be taken aback;was taken aback	verrast
ほうかご	=	after school	na school
スニーカー	=	sneaker	sneaker
スポーツドリンク	=	sports drink	sportdrank
チャイム	=	chime	bel
ホームステイ	=	homestay	homestay
動画	どうが	video	video
屋上	おくじょう	rooftop	dak
昼休み	ひるやすみ	lunch break	lunchpauze
水着	みずぎ	swimsuit	badpak
禁止	きんし	prohibition	verbod
部活	ぶかつ	club activity	club
#103	Day Trip	Day Trip	Make travel plans	Dagtrip in de stad plannen
かいそく	=	express train	sneltrein
かんこうきゃく	=	tourist	toerist
きっぷうりば	=	ticket area	kaartjesloket
しずかに	=	quietly	stil
しょうてんがい	=	shopping street	winkelstraat
てんじ	=	exhibition	tentoonstelling
でゆうめい	=	famous for	beroemd om
にのりかえます	=	transfer;change trains;change buses;switch vehicles;change rides;switch rides	stap over;overstap
ゆうせんせき	=	priority seat	prioriteitsstoel
何番ホーム		which platform number	perronnummer
牛肉	ぎゅうにく	beef	rundvlees
番	ばん	turn;number	nummer
終電	しゅうでん	last train	laatste trein
運転手	うんてんしゅ	driver	chauffeur
遠い	とおい	far;far away	ver
間に合います	まにあいます	be in time;be on time;make it;suffice;be enough;get there in time;arrive on time	op tijd
#104	CulturDiff	CulturDiff	Describe a festival gathering	Culturele tradities bespreken
いわいます	=	celebrate;congratulate;observe;commemorate;have a party	viert;vieren
えっ	=	wow	hè
お知らせ	おしらせ	announcement	mededeling
かみぶくろ	=	paper bag	papieren zak
こくさいこうりゅう	=	international exchange	uitwisseling;uitwisselingsevenement
つけもの	=	pickle	ingelegde groenten
と同じです		the same as	hetzelfde als
と違います		different from	verschillend
べんとうばこ	=	bento box	lunchbox
もみじ	=	maple leaf	esdoornblad
オムレツ	=	omelet	omelet
クリスマスツリー	=	Christmas tree	kerstboom
コスチューム	=	costume	kostuum
ジャム	=	jam	jam
ハート	=	heart	hart
バレンタインデー	=	Valentine's Day	Valentijnsdag
ホワイトデー	=	White Day	White Day
出身	しゅっしん	origin	afkomst
学生会館	がくせいかいかん	student center	studentenhuis
春	はる	spring	lente
秋	あき	autumn	herfst
集まります	あつまります	get together	verzamelen
#105	SchoolFest	SchoolFest	Plan a festival booth	Een schoolwinkel organiseren
うまくいきます	=	go well;succeed;work out;turn out well;progress smoothly;go smoothly	gaat
えのぐ	=	paint	verf
おつり	=	change	wisselgeld
かんばん	=	signboard	bord
がくえんさい	=	school festival	schoolfestival
こおり	=	ice	ijs
そうしましょう	=	Let's do that	Laten we dat doen
のり	=	glue	lijm
はさみ	=	scissors	schaar
クラス	=	class	klas
シロップ	=	syrup	siroop
メロン	=	melon	meloen
会計	かいけい	cashier;the invoice;check;the bill;treasurer	kassa;rekening;penningmeester
全部	ぜんぶ	all	alles
切ります	きります	cuts;will cut	snijd;snijden;snijdt
売り切れ	うりきれ	sold out	uitverkocht
始めます	はじめます	begin;start;starts	
描きます	えがきます	will draw;draw;draws	getekend;tekenen
紙ナプキン		paper napkin	papieren servet
話し合います	はなしあいます	discusses	overleggen
#106	Picnic	Picnic	Plan a picnic with friends	Een picknick organiseren
ある	=	be	zijn
おしぼり	=	wet towel	nat doekje
かん	=	can	blik
しばふ	=	lawn	grasveld
すいとう	=	water bottle	drinkfles
そつぎょうしき	=	graduation ceremony	afstudeerceremonie
たたみます	=	fold;close;put away;arrange	vouw
のせます	=	put on;place on;load;give a ride;publish;include;carry	plaats
ふきます	=	blows;play	veeg;vegen
ます	=	polite form;will...	kan
よくて	=	nice	goed
られます	=	can	kan;kun
ガソリン	=	gasoline	benzine
トランク	=	trunk	kofferbak
プラスチック	=	plastic	plastic
レジャーシート	=	leisure sheet	picknickkleed
台	だい	counter for machines;counter for furniture	stuks;stuk
天気よほう		weather forecast	weersvoorspelling
気持ちいい	きもちいい	pleasant	prettig
洗います	あらいます	wash;will wash;washes;I wash	was
道	みち	way	weg
集めます	あつめます	collect;gather;assemble;accumulate;amass	verzamel;verzamelen
#107	Conference	Conference	Point out people at events	Zaken bespreken op conferentie
あちら	=	over there	daar
いて	=	stay;is;being;was and;is so;is and;was so	zijn
おぼえていますか	=	do ... remember	herinner je je
おぼえていません	=	do not remember;do not recall;have not memorized;do not know;do not have in mind;do not remember clearly;do not recall well;do not remember exactly	heeft ze nog niet onthouden
かいさいします	=	hold;host;take place;be held;organize;convene	houdt;houden
せいこうします	=	succeed;be successful;achieve success	slagen
たんとうします	=	to be in charge of;to take charge of;to be responsible for;to handle;to undertake;to take on;to assume	behandelt;behandelen;behandel
ちいき	=	region	regio
なふだ	=	name tag	naamplaatje
のこります	=	remain;stay;be left;be remaining;be leftover;stay behind;remain behind	blijft;blijf;blijven
カタログ	=	catalog	catalogus
カンファレンス	=	conference	conferentie
サンプル	=	sample	monster
ネットワーク	=	network	netwerk
ブース	=	booth	stand
一昨年	おととし	the year before last	twee jaar geleden
中国	ちゅうごく	Chinese;China	China
中央アメリカ	ちゅうおうアメリカ	Central America	Midden-Amerikaanse;Midden-Amerikaans;Midden-Amerika
再来年	さらいねん	the year after next	het jaar na volgend jaar
新商品	しんしょうひん	new product	nieuw product
来ない		does not come;do not come;will not come	komt;komen
東ヨーロッパ	ひがしヨーロッパ	Eastern Europe;East Europe	Oost-Europa;Oost-Europese
社長	しゃちょう	president	directeur
西アフリカ	にしアフリカ	West Africa	West-Afrika
部長	ぶちょう	manager	afdelingshoofd
顔	かお	face	gezicht
#108	Bad Date 2	Bad Date 2	React to a bad date	Deel een teleurstellende ervaring
ううん	=	no	nee
うそ	=	no way;lie	Nee toch;leugen
うん	=	yeah	ja
かっこよくなかった	=	was not cool	niet cool
しょうじき	=	honestly	eerlijk
そうだね	=	That's right	dat klopt
その人	そのひと	that person	die persoon
ただいま	=	I'm home	ik ben thuis
だった	=	were;had;was;d	was;keek;hield
どうだった	=	how was;how did it go;what was it like;how did it turn out;was like	was
やばい	=	darn;oh no;dreadful;oh my God;risky;cool;dang;terrible;sick;awesome;sweet;awful;dangerous;yikes	gevaarlijk;gevaarlijke;gevaarlijker
元カノ	もとカノ	ex-girlfriend	ex-vriendin
元カレ	もとカレ	ex-boyfriend	ex-vriend
無理	むり	impossible;overexert	onmogelijk;onmogelijkheid
行かない		do not go;why don't we	ga
#109	Game Cent	Game Cent	Invite friends to hang out	Activiteiten bij een arcade bespreken
あるよ	=	to be;to exist;to have;there is;there are;happen	er is
いいね	=	good	leuk
いいよ	=	okay	goed
くれない	=	would you mind ... for me;could you ... for me;could	niet;geen
ごめん	=	sorry	sorry
すごく	=	really	erg
そうしよう	=	Let's do that	Laten we dat doen
だ	=	is;am;it's;you're;I'm;will be;were;that's;'s;they're;re;da;have;has;are;was;wasn't	is
ガチャポン	=	gachapon machine	capsuleautomaat
キャラクター	=	mascot	personage;personageproducten;personages;spelerspersonage
クレーンゲーム	=	claw machine	kraanspel
ゲームセンター	=	arcade	gamehal
ゲーム機	ゲームき	arcade machine	spelcomputer
プライズ	=	prize	prijs
ボウリング	=	bowling	bowlen
一時間	いちじかん	per hour	per uur
地図	ちず	map	kaart
晴れ	はれ	sunny weather	zonnig
楽しみ	たのしみ	looking forward to	uitkijken naar
#110	Stu Abroad	Stu Abroad	Ask about study abroad	Ervaringen studie in het buitenland
がやくにたちます	=	be useful;be helpful;serve a purpose;be of use;come in handy	nuttig
きかい	=	machine	kans
けいじばん	=	bulletin board	prikbord
こうりゅうします	=	exchange;interact;communicate;mingle;interchange	uitwisselen;uit te wisselen
こくさいかんけい	=	international relations	betrekkingen
しょうがくきん	=	scholarship	studiebeurs
での生活		life in;living in;lifestyle in;daily life in;existence in;life at;living at	het leven in
ないよう	=	content	inhoud
になれます	=	become;get;turn into;grow into;adapt;get used to;become accustomed to	went
べんきょうできます	=	can study;able to study;can learn;able to learn;can study with;able to study with	kan studeren;kunt studeren;kun studeren
もうしこみます	=	apply;make an application;subscribe;register;sign up	meld
りゅうがく	=	studying abroad	studeren in het buitenland
りゅうがくせいセンター	=	international student center;study abroad center;foreign student center	uitwisselingsstudentencentrum
インターンシップ	=	internship	stage
ビザ	=	visa	visum
プログラム	=	program	programma
一か月間		one month	maand
南アジア	みなみアジア	South Asia;Southern Asia	Zuid-Azië
学期	がっき	semester	semester
年間	ねんかん	year	jaar
海外の		foreign	buitenlandse
週間	しゅうかん	weeks;week	week
#111	Game Night	Game Night	Share your favorite foods	Een spelletjesavond beleven
えび	=	shrimp	garnaal
かんせんします	=	infect;be infected;contract;catch;play;participate in;join	kijken
だいこん	=	daikon	daikon
どうして	=	why	waarom
どちらでも	=	either one	het maakt niet uit
なす	=	eggplant	aubergine
ほかに	=	any other	nog iemand
んです	=	is that	ben;is;heb
タコス	=	taco	taco
ダーツ	=	darts;dart game;throwing darts	darten
ポーカー	=	poker	poker
二十歳	はたち	twenty years old	twintigjarige
冷たい	つめたい	cold	koude;Koud;koud;Koude;gekoeld
変わります	かわります	change	veranderen;verandert
大好き	だいすき	love	heel veel van houden
妹さん	いもうとさん	younger sister	jongere zus
弟さん	おとうとさん	your younger brother	broertje
眠い	ねむい	sleepy;sleepier	slaperig
負けます	まけます	lose;be defeated;give in;yield;succumb	verlies
運転します	うんてんします	drives;drive	rijden
電話	でんわ	call;phone	telefoon
#112	Repair	Repair	Describe a device problem	Bespreek reparatiediensten
うっかり	=	carelessly	per ongeluk
お客さま	おきゃくさま	customer	gast
お待たせしました	おまたせしました	sorry for making you wait	Ik heb u laten wachten.
きえます	=	disappear;go out;vanish;be extinguished;fade away;be erased	verdwijnt;verdwijnen
こぼします	=	spill	mors
さいきどうします	=	restart;reboot;reactivate;reinitialize;resume;restarting;rebooting	herstart
しゅうり	=	repair	reparatie
しゅうり屋		repairer	reparatiewinkel
せつぞく	=	connection	verbinding
できます	=	knows;know;can do;will be able to;can;can play;will do;can speak;possible	Kan
でんちがきれます	=	battery runs out;battery dies;battery is dead;battery goes dead;battery is exhausted;battery runs out quickly;battery dies quickly;battery goes dead quickly;battery run out	leeg;is leeg;gaat leeg
どうしたらいいですか	=	what should I do?	wat moet ik doen
ほしょう	=	warranty	garantie
われます	=	break;crack;split;be broken;be cracked;be split;sing	breekt
アップデートをします	=	update;upgrade;refresh	doen;doe
インストールします	=	install;set up;load	installeer
ウイルス	=	virus	virus
システム	=	system	systeem
ファイル	=	file	bestand
今日中に	きょうじゅうに	within today	vandaag nog
動きます	うごきます	works;run;runs;work	Werkt;werkt
#113	Patient	Patient	Describe your symptoms	Gezondheid bespreken met een arts
おれます	=	break;fold;snap;bend;crack;fracture	breekt
かんじゃ	=	patient;sufferer;victim	patiënt
けっかが出ます		results come out;results appear;results are produced;results are released;results will be out;results will come out;results will be available	komen er
しょうじょう	=	symptom	symptoom
しんさつ	=	examination	onderzoek
ほけん	=	insurance	verzekering
ほね	=	bone	bot
ゆっくり	=	slow;slowly;relax	Langzaam;langzaam
リハビリ	=	rehabilitation	revalidatie
レントゲン	=	X-ray	röntgenfoto
動かします	うごかします	move;operate;shift;stir;activate;exercise	bewegen;Beweeg;beweegt
名字	みょうじ	surname	achternaam
手	て	hand	hand
持ちます	もちます	hold;have;carry	houd;Houd
立ちます	たちます	stand	
#114	First Job	First Job	Share good news with friends	Nieuws over successen delen
いいんですか	=	Is it really okay?	is het goed?
おごります	=	treat	trakteer
お会計おねがいします		check please;the bill please;can I have the check;may I have the bill;please bring the check;I would like to pay;I'd like to settle the bill;I'd like to settle up	de rekening alstublieft
お好み焼き	おこのみやき	okonomiyaki	okonomiyaki
きゅうりょう	=	salary	salaris
そうです	=	I hear that	zo te horen
てんすうをつけます	=	give points;assign scores;grade;mark;add points;record scores	geven;geeft
にそうだんします	=	consult;discuss;talk over;confer;seek advice	overleg plegen;overleg
わりかんします	=	split the bill;go Dutch;share the cost;pay separately;go Dutch on;split the cost	Delen;delen
をそつぎょうします	=	to graduate;to finish school;to complete a course	afstuderen
中学校	ちゅうがっこう	middle school	middelbare school
中学生	ちゅうがくせい	middle school student	middelbare scholier
働きます	はたらきます	work;works	
再来週	さらいしゅう	the week after next	over twee weken
夏	なつ	summer	zomer
年上	としうえ	older	ouder
忙しい	いそがしい	busy;occupied	Drukke;druk;Druk
明るい	あかるい	bright;cheerful;brighter	vrolijke;vrolijk
無料	むりょう	free	gratis
返事	へんじ	reply	antwoord
#115	Karaoke	Karaoke	Talk about music you like	Genieten van karaoke met vrienden
お休み	おやすみ	holiday	sluiting
くなくて	=	not;without being;not having;because it is not;since it is not	niet
しゅうりょうじかん	=	end time	eindtijd
じゃなくて	=	not ... but;isn't ... but;not but rather	maar
たまに	=	occasionally	af en toe
なつかしい	=	from the good old days	nostalgisch;Nostalgisch;Nostalgische
ひきます	=	play;will consult;consults a dictionary;consult a dictionary;plays;going to play	spelen;speel;speelt
カラオケ店	カラオケてん	karaoke bar	karaokebar
コース	=	course	route
ピアノ	=	piano	piano
ファン	=	fan	fan
マイナー	=	minor	minder bekend
低い	ひくい	weak;lower;low;unlikely	Laag;Lage
大ヒット	だいヒット	big hit	groot succes
平日	へいじつ	weekday	weekdag
最新	さいしん	newest;latest	laatste;Laatste
禁煙	きんえん	non-smoking	niet-roken;rookvrij
私の		mine;my;to me;of mine	mijn;mijne
音楽	おんがく	music	muziek
#116	Healthy 3	Healthy 3	Describe your exercise routine	Gezonde gewoontes bespreken
あぶら	=	oil	olie
きんにく	=	muscle	spier
こし	=	lower back	onderrug
なかま	=	companion	kameraad
のぼります	=	climbs;am going to climb;will climb	klimt;Klimt;klim
やせます	=	lose weight;become thin;slim down;get skinny	val
よわい	=	weak	zwakke;zwak
トレーナー	=	trainer	trainer
マシン	=	machine	machine
一週間に		a week	per week
医者	いしゃ	doctor	arts
塩	しお	salt	zout
少しだけ		slightly	even
熱心に		enthusiastically	ijverig
病院	びょういん	hospital	ziekenhuis
足	あし	foot	voet
#117	Direction2	Direction2	Ask for directions	Navigeren met smartphone apps
あんない	=	guide	gids
きごう	=	symbol	symbool
ことば	=	word	woord
しんごう	=	traffic light	verkeerslicht
ふみきり	=	railway crossing	overweg
まっすぐ	=	straight	rechtdoor
むこう	=	the other side	overkant
を右に曲がります		turn right;take a right;make a right turn;turn right at	Sla rechts af
を左に曲がります		turn left;take a left;go left;turn left at;turn left by	sla linksaf
ナビ	=	GPS	navigatie
メーター	=	meter	meter
何と読みますか		How do you read it;What is the reading;How is it pronounced;What does it say;What do you call it;What is it called	lees je
分かります	わかります	knows;understand;can understand;I know;know	Weet;weet;Ken;ken
危ない	あぶない	dangerous;in danger	gevaarlijke;gevaarlijk
姉	あね	older sister	zus
歩行者	ほこうしゃ	pedestrian	voetganger
町	まち	town	stad;steden;stadje
知ります	しります	know;learn;find out;be aware of;understand;recognize;be familiar with	weet
道をまよいました		get lost;lose the way;lose my way;lose direction;got lost;lost the way;lost my way;lost direction	verdwaald
#118	Kendo	Kendo	Describe your practice routine	"Kendo" ontdekken voor ontspanning
いっしょうけんめい	=	diligently	hard
かっこよくて	=	cool;stylish;good-looking;handsome;attractive	coole;cool
きほん	=	basic	basis
けいこ	=	practice	oefening
けんどう	=	kendo	kendo
しない	=	doesn't;does not;do not;don't;would not;will not;won't;doesn't play	shinai
しんこきゅうをします	=	take a deep breath;breathe deeply;do deep breathing;practice deep breathing	diepe ademhaling
たまります	=	accumulate;build up;collect;gather;pile up;store up;save	Verzamelt;verzamelt;verzamelt zich
れいをします	=	bow;show respect;pay respects;express gratitude	maak;maken
ウォーミングアップ	=	warm-up	warming-up
スッキリしました	=	feel refreshed;feel relieved;feel clear-headed;feel better;feel refreshed after exercise;feel clear after stress;feel relieved from stress;feel invigorated	voelde
体	からだ	body	lichaam
借ります	かります	borrow	
十回	じっかい	twenty;ten times	tien keer
大きいこえを出します		speak loudly;raise one's voice;shout;speak in a loud voice;shout out;call out	maken
方	ほう	way	manier
親切	しんせつ	kind	vriendelijk
貸します	かします	will lend	uitlenen
道場	どうじょう	dojo	dojo
道着	どうぎ	uniform	judogi
集中します	しゅうちゅうします	concentrate;focus;pay attention	Concentreer;concentreer
難しい	むずかしい	tough;deep;harder;difficult;tricky;challenging;hard;difficulties;wasn't	Moeilijk;moeilijke;moeilijk;Moeilijke
静か	しずか	quiet	rustig
頭	あたま	head	hoofd
#119	RoomMates	RoomMates	Describe your living situation	Over samenwonen met huisgenoten praten
いや	=	dislike	vervelende;vervelend
かぎをかけます	=	lock;lock up;fasten;bolt;secure	sluit
か月	かげつ	month;months	maanden;maand
きげんが悪い		in a bad mood;grumpy;irritable;cranky;moody;unhappy;bad-tempered	slechtgehumeurd;slecht humeur
けいやく	=	contract	contract
こうかいしています	=	regret;regretful;regretting;repent;repenting;feel remorse;be sorry;lament;cancel;canceling	spijt hebben
こまっています	=	troubled	zit in de problemen
せつやくします	=	save;economize;conserve;cut down on;reduce expenses;conserve time;save time	bespaarde;bespaar
せんたくもの	=	laundry	was
なくします	=	loses	verlies;verliest
なやみ	=	worry	zorg
みたい	=	looks;look like;seems like;looks like;seems	als een;als;lijkt erop dat
イライラします	=	get on your nerves;getting on my nerves;gets on my nerves;frustrating	geïrriteerd
シェアハウス	=	share house	gedeeld huis
一人ぐらしをします		live alone;live by oneself;live on one's own;live independently;start living alone;begin living alone	wonen
大変	たいへん	difficult;serious	moeilijk;erg
年下	としした	younger;junior	jonger
汚い	きたない	dirty	Vies;Vuile;vieze;vies;vervuilde
注意します	ちゅういします	pay attention;be careful;take care;warn;caution;pay close attention;watch carefully	opletten
電気	でんき	electric	elektriciteit
#120	Clinic2	Clinic2	Describe your symptoms	Symptomen bespreken met artsen
かゆい	=	itches;itchy;itching;itch	jeukerigheid;jeukerig
けつあつ	=	blood pressure	bloeddruk
けんさ	=	examination	onderzoek
しょほうせん	=	prescription	recept
とめます	=	stop;park	parkeert;parkeer
なくなります	=	disappear;die;be lost;run out;vanish;cease to exist;pass away;go away;be relieved	raken;raakt
のど	=	throat	keel
はちみつ	=	honey	honing
はなみずが出ます		have a runny nose;have nasal discharge	Er is loopneus
はれます	=	will be sunny;will be clear	opzwelt;zwellen;zwelt
体温を計ります		measure body temperature;take body temperature;check body temperature;check temperature;take temperature	Meet;meet
円さつ		yen bill	yenbiljet
受けます	うけます	receives	ondergaan;onderga
後	ご	later;after;the rest	nadat;later;afloop
生年月日	せいねんがっぴ	birth date	geboortedatum
痛み止め	いたみどめ	painkiller	pijnstiller
薬	くすり	medicine	medicijn
#121	Golden wk	Golden wk	Describe holiday plans	Bespreek Golden Week tradities
おりがみ	=	origami	origami
かぶと	=	helmet	helmen;samoeraihelm;helm
けんこう	=	health	gezondheid
こいのぼり	=	koinobori	koinobori
さむらい	=	samurai	samoerai
しあわせ	=	happiness	geluk
しゅくじつ	=	holiday	feestdag
じっか	=	parental home	ouderlijk huis
とりい	=	torii	torii
のかたち	=	shaped	in de vorm van
の終わり		end of	het einde van
はた	=	flag	vlag
ひさしぶりに	=	after a long time	na lange tijd
ゴールデンウイーク	=	Golden Week	Golden Week
休みを取ります		take a break;take time off;take a holiday;take a day off;take leave	neemt;neem
兄	あに	older brother	broer;broers
半年	はんとし	half year	zes maanden
妹	いもうと	younger sister	zusje
子どもの日		Children's Day	Kinderdag
広島	ひろしま	Hiroshima	Hiroshima;Hiroshima's
県	けん	Prefecture;prefecture	prefectuur
連休	れんきゅう	long holiday	vakantie
#122	Closing	Closing	Order food at cafes	Kleding en accessoires kopen
いない	=	do not;away;has not;have not;there isn't;am not;isn't;is not;are not;does not;not	niet;geen;niemand
かっこよくない	=	not cool;uncool;not stylish;not good-looking;not handsome;unstylish;unattractive	niet cool
こぜに	=	small change	kleingeld
しちゃくしつ	=	fitting room	paskamer
しつがいい	=	good quality	goede kwaliteit
ちょうど	=	just	precies
ついでに	=	while I'm at it	terloops
へー	=	Oh	oh
まあ	=	well	nou
もう少し考えます		I will think a little more;I will consider it a bit more;I will give it some more thought;I will think it over a little more;I will mull it over a bit more	ik denk er nog even over na.
クレープ	=	crepe	crêpe
デザイン	=	design	ontwerp
パーセント引き		percentage discount	procentkorting
フードコート	=	food court	foodcourt
ユニセックス	=	unisex	uniseks
下がります	さがります	go down	dalen;daalt
引き出します	ひきだします	pull out;withdraw;draw out;extract;take out;hikidasu	opneem;neem
有料	ゆうりょう	paid	betaald
着てみます		try on;try wearing;put on;wear and see	proberen te dragen
税込み	ぜいこみ	including tax	inclusief belasting
閉店	へいてん	closing	sluiting
間違えます	まちがえます	mistake	vergis;vergist
#123	Cleanup	Cleanup	Suggest ways to clean up	Meedoen aan opruimactie
お	=	hot springs	Oh
おかげさまで	=	thanks to you	dankzij u
きょうりょく	=	cooperation	samenwerking
しましょうか	=	shall	zullen we
しゅるい	=	type	soort
においます	=	smell;emit an odor;give off a scent;stink;reek;have a smell;give off a smell	ruikt
ひろいます	=	pick up;gather;collect;find;take up	rapen;opruimt;raap
むし	=	bug	insect
むすびます	=	tie;bind;connect;conclude;join;link;form;knot;fasten;seal	vastknoop;knoop
もやすゴミ	=	combustible waste	brandbaar afval
もやせないゴミ	=	non-burnable waste	niet-brandbaar afval
ゴミすてば	=	garbage dump	vuilnisplaats
ゴミぶくろ	=	garbage bag	vuilniszak
ペットボトル	=	plastic bottle	plastic fles
ホール	=	hall	zaal
公園	こうえん	park	park
分けます	わけます	divide;separate;split;share;distribute	scheiden
危険物	きけんぶつ	hazardous material	gevaarlijke stof
持って帰ります		take home;bring back;carry home;take back;bring;carry	neem mee
歩いて		walk	lopend
#124	P. History	P. History	Talk about childhood injuries	Jeugdherinneringen delen
うらやましいです	=	jealous	jaloers zijn
えさをやります	=	feed the pet;give food to the animal;feed the animal;give feed;give food;feed properly	geef
けがします	=	injure;hurt;wound;get injured;get hurt	verwondt
しゅじゅつを受けます		undergo surgery;have surgery;receive surgery;get an operation;have an operation;undergo an operation	ondergaat;onderga
なかがいい	=	close;on good terms;friendly;harmonious;intimate;good friends	overweg kan;overweg kunnen;overweg kon;overweg
にかくれます	=	hide in;be hidden in;conceal oneself in;hide behind;hide under;hide inside	Verbergt zich;verbergt zich;verbergt
にのぼります	=	to climb;to go up;to ascend;to rise;to climb up;to scale	beklim;beklimmen
はなれます	=	separate;leave;move away;be distant;part;detach;go away from	Verwijderd;verwijderd
ひじ	=	elbow	elleboog
り	=	things like	r
ミャンマー	=	Myanmar;Burma	Myanmar
何度も	なんども	often	meermalen
八歳		eight	acht jaar oud;achtjarige;jaar
友だちができます		make friends;become friends;get friends;find friends;form friendships	maken
大切	たいせつ	precious	belangrijk
弟	おとうと	younger brother	broertje
思い出	おもいで	memory	herinnering
泣きます	なきます	cry;weep;sob;wail;shed tears	huilt
犬	いぬ	dog	hond
猫	ねこ	cat	kat
笑います	わらいます	laugh;smile;chuckle;giggle;grin	lacht;lach;Lacht
耳	みみ	ear	oor
転校生	てんこうせい	transfer student	overstappende leerling
頭がいい	あたまがいい	smart;intelligent;smarter	slimme;slim
#125	New Guy	New Guy	Explain the office rules	Een Japans kantoor verkennen
おもて	=	front	voorzijde
おゆ	=	hot water	heet water
じゆうに	=	freely	vrij
じょうし	=	boss	baas
せってい	=	setting	instelling
せつめいします	=	explain;give an explanation;describe;clarify;illustrate;instruct	uitleggen
できる	=	can	kan
でください	=	please;kindly;would you please;could you please;do not;don't	alstublieft
ふえます	=	increase;grow;multiply;rise;add;augment;spread	nemen toe;toeneemt;neemt toe;toenemen
もう一度	もういちど	once more	nogmaals
シュレッダー	=	shredder	shredder
ハンコを押します		stamp a seal;affix a seal;put a stamp;press a seal;sign with a seal	zet;zetten
プリントします	=	print;print out;copy	printen
マナー	=	manner	etiquette;gedragsregels
ルール	=	rule	regel
数	すう	number	aantal
新人	しんじん	new employee	nieuweling
用	よう	purpose	voor
皆さん	みなさん	everyone	iedereen
自分の		my own	mijn eigen
許可を取ります		obtain permission;get permission;seek approval;acquire authorization;ask for permission	vraagt;vraag
#126	Gaming	Gaming	Talk about new games	Videogamefuncties bespreken
えー	=	Ugh	oh
お金をもらいます		receive;get;obtain;accept;take;earn;be paid	krijg;krijgt
せかい	=	world	wereld
たたかいます	=	fight;battle;combat;struggle;contend;compete	vecht
てき	=	enemy	tegenstander
まほうの	=	magical	magisch
めんせつ	=	interview	sollicitatiegesprek;interview
やります	=	will do;does;do	doet;doen
オンライン	=	online	online
クモ	=	spider	spin
クリアします	=	clear;pass;complete;overcome;resolve;finish;beat	voltooi;voltooien
ゲーム会社		game company	gamebedrijf
プレイヤー	=	player	speler
ユーザー名	ユーザーめい	username	gebruikersnaam
仕事	しごと	job	werk
助けます	たすけます	save;helps	help;Help
島	しま	island	eiland
新作	しんさく	new work	nieuw werk
死にます	しにます	die;pass away;perish;expire;lose a life	sterf
死んだ		is dead;died;are dead	gestorven
石	いし	stone	steen
美しい	うつくしい	beautiful;gorgeous	mooi;Mooie;mooiste;mooie
#127	Moving out	Moving out	Reduce waste at home	Lokale afvalbeheer bespreken
かがみ	=	mirror	spiegel
きふします	=	donate;contribute;give;make a donation;give away	doneert;doneren;Doneer;doneer
しっかり	=	thoroughly	goed
しゅうしゅう	=	collection	inzamelen
つつみます	=	wrap;cover;pack;envelope;conceal;package	ingepakt
できて	=	can	kunnen doen
といけません	=	must;have to;should;need to;cannot afford not to;have got to;ought to	moet
ひも	=	string	touw
へらします	=	reduce;decrease;diminish;lessen;cut down;remove	Verminder;verminderen
もったいない	=	is being wasted;is too good for;waste;is wasteful	zonde
や	=	or;shop;and;restaurant;store	en
ようき	=	container	container
ガラス	=	glass	glas
キャップ	=	cap	dop
ゴミを出します		take out the trash;put out the garbage;dispose of the garbage;throw out the trash;put out the rubbish;take out the rubbish	zet het afval buiten
センチ	=	centimeter	centimeter
ルールをまもります	=	follow the rules;obey the rules;abide by the rules;keep the rules;observe the rules;stick to the rules;respect the rules	volg;volgen;volgt
以上	いじょう	or more	of meer
外します	はずします	remove;take off;detach;unfasten;leave;be away from;miss;skip	verwijdert;verwijder
家電	かでん	home appliance	huishoudelijk apparaat
自転車	じてんしゃ	bicycle	fiets
#128	Senior Yr	Senior Yr	Talk about your work plans	Toekomst en identiteit bespreken
おめでとうございます	=	congratulations	gefeliciteerd
きんちょうします	=	to be nervous;to be tense;to feel anxious;to be on edge;to be uptight;to feel nervous	zenuwachtig
けんしゅう	=	training	stage
こと	=	thing;something;matter;things;anything;to;what;that	ding
ごうかくします	=	pass;succeed;be accepted;qualify;succeed in;clear	slagen
しゅうしょく	=	employment;getting a job;finding employment;securing a job;job hunting	baan vinden
じしん	=	earthquake	aardbeving
つなみ	=	tsunami	tsunami
ら	=	if;when	ra
ボーナス	=	bonus	bonus
入社します	にゅうしゃします	join a company;enter a company;start working at a company	in dienst treden;in dienst
勉強	べんきょう	study	studie
十二日	じゅうににち	twelfth day;twelve days;the twelfth of the month;December 12th;12th day;by the twelfth;from the twelfth;until the twelfth	twaalfde
年目		year	jaar
本物の		genuine	echt
練習します	れんしゅうします	practice;practices	
英語	えいご	English	Engels
起きます	おきます	get up;I wake up;happen;wakes up	opstaan;sta op
通います	かよいます	commute;go;commutes;goes	ga
遅く	おそく	late	laat
食べてみます		try to eat;try eating;taste;sample;have a try;give it a try;give it a taste	proberen te eten
#129	Contingen	Contingen	Ask about train times	Reis naar Japan plannen
icカード		IC card	IC-kaart
おうふく	=	round-trip	retour
お年寄りの人		elderly people	oudere mensen
こうべ	=	Kobe;head;capital;port;city	Kobe
たこ焼き	たこやき	takoyaki	takoyaki
ちゅうか料理		Chinese cuisine	Chinees eten
つゆ	=	the rainy season	moesson
でのりかえます	=	transfer at;change trains at;transfer by;change vehicles at;switch at;change at;transfer by taxi	stap over;over te stappen
とまります	=	stay;will stay;stops;stop;stays;will stop	stopt;Stopt
ふつうれっしゃ	=	local train	stoptrein
ゆずります	=	to yield;to hand over;to transfer;to concede;to give up;to assign;to sell;to relinquish;to give up a seat	opgeven
わん	=	bay	baai
チャージします	=	charge;load;top up;recharge;add;put money on	oplaad;laad
プリン	=	pudding	pudding
レインコート	=	raincoat	regenjas
出発します	しゅっぱつします	leave;depart;am departing;departs;leaves;leaving	vertrekt;vertrekken;Vertrekken
台風	たいふう	typhoon	tyfoon
和牛	わぎゅう	wagyu	wagyu
特急	とっきゅう	limited express	sneltrein
番線	ばんせん	line	spoor
終点	しゅうてん	final stop	eindpunt
足ります	たります	be enough;suffice;be sufficient;meet the need;satisfy;be sufficient for	genoeg
都市	とし	city	stad
#130	Healthy Ch	Healthy Ch	Describe how you feel	Gezondheid en welzijn bespreken
かいてき	=	comfortable	comfortabel
くわえます	=	hold in mouth;bite;add;include;hold;carry in mouth	voeg
しょくぶつ	=	plant	plant
せなか	=	back	rug
そだてます	=	raise;bring up;nurture;grow;rear;cultivate	kweek
たね	=	seed	zaad
ひざ	=	knee	knie
キャベツ	=	cabbage	kool
ジャンクフード	=	junk food	junkfood
タンパクしつ	=	protein	eiwit
バランス	=	balance	balans
会員	かいいん	member	lid
体力がありません		I have no physical strength;I am out of stamina;I lack physical energy;I have no endurance;I am physically weak;I have no physical fitness	geen energie;geen energie heb
大事	だいじ	important	belangrijk
方がいいと思います		I think it is better to;I think you should;I think it would be best to;I think it is advisable to;I think it is preferable to;You had better;It would be better not to;It is best not to	beter kunt
歩きます	あるきます	walk;will walk;walks;going to walk	
部分	ぶぶん	part	gedeelte
頭痛	ずつう	headache	hoofdpijn
#131	games	games	Items: Share where items are kept	Uitleg: Vertel wat je bij je hebt
すすめます	=	recommend;suggest;advance;promote;encourage;proceed	aanbevelen;aanmoedigen;bevorderen;promoten;adviseren;voorstellen
サプリ	=	supplement;dietary supplement;vitamin supplement;nutritional supplement	supplement
チームワーク	=	teamwork	teamwork
上品な		elegant	elegant
優先席	ゆうせんせき	priority seat	prioriteitsstoel
勝ちます	かちます	will win;wins	
参加者	さんかしゃ	participant	deelnemer
庭	にわ	garden	tuin
普段	ふだん	usually	gewoonlijk
歯磨き粉	はみがきこ	toothpaste	tandpasta
理解します	りかいします	understand;comprehend;grasp;appreciate;realize	
用品	ようひん	equipment	artikelen;benodigdheden;spullen;materialen;gereedschap
秒	びょう	seconds;second	seconde
美しさ	うつくしさ	beauty	schoonheid
説明	せつめい	explanation;description;explanations	uitleg;verklaring;toelichting;beschrijving;presentatie
説明書	せつめいしょ	instruction manual	handleiding
財布	さいふ	wallet	portemonnee
販売	はんばい	sales;sale	verkoop
運	うん	luck	geluk
限界	げんかい	limit	grens
#132	storytelling	storytelling	Encounters: Share contact information	Ervaringen: Vertel over je reiservaringen
おどろきます	=	to be surprised;to be amazed;to be astonished;to be shocked;to be startled	verrassen;verbazen;schrikken;verbaasd zijn
ついています	=	there's ... on	zitten;vastzitten;bevestigd zijn;zitten op;vastzitten aan;geluk hebben;meezitten
ほこりっぽい	=	dusty	stoffig;stofferig
ゴミ捨て場	ごみすてば	garbage disposal area	vuilnisbelt
ライター	=	lighter	aansteker
一泊	いっぱく	one night	één nacht
帰り道	かえりみち	way home	weg naar huis
扱います	あつかいます	treat;treating	behandelen;omgaan met;verwerken;bedienen;beheren;regelen;verzorgen
日焼け止め	ひやけどめ	sunscreen	zonnebrandcrème
横に	よこに	sideways;beside;next to;horizontally;alongside;near;by	naast;aan de zijkant;zijwaarts;horizontaal
残念	ざんねん	disappointing	jammer
社員旅行	しゃいんりょこう	company trip	
自然	しぜん	nature;natural	natuur;natuurlijk;wild
色々な		various	verschillende;diverse;allerlei;verscheidene
調べます	しらべます	will search for	onderzoeken;nakijken;opzoeken;controleren;uitzoeken
連絡先	れんらくさき	contact information	contactgegevens
逮捕します	たいほします	arrest;apprehend;capture	arresteren;oppakken;aanhouden
騙します	だまします	deceive;cheat;trick;fool;swindle	bedriegen;misleiden;foppen;voor de gek houden
#133	hobbies 4	hobbies 4	Customs: Ask about local customs	Gewoonten: Vertel over je gewoonten
お湯	おゆ	hot water	heet water
こうげきします	=	attack;strike;assault;offensive;aggression;move;make a move	
どうやら	=	seems	blijkbaar
はっきり	=	clearly	duidelijk
ギリギリ	=	just barely	net
九州	きゅうしゅう	Kyushu	Kyushu;Kyushu-eiland;Kyushu-regio
他の人		other person	andere persoon;iemand anders;een ander;andere mensen
作者	さくしゃ	author	auteur
呼びます	よびます	will call;call;calls	
嘘をつきます	うそをつきます	tell a lie;lie;fib;deceive;tell untruths	liegen;bedriegen;onwaarheid vertellen
弾きます	ひきます	plays;play	spelen;tokkelen;bespelen;plukken
慣習	かんしゅう	custom	gewoonte
手伝います	てつだいます	help;helps	helpen;assisteren;bijstaan;ondersteunen;bijspringen
撮ります	とります	takes;will take;take	nemen;fotograferen;schieten;vastleggen;maken
敵	てき	enemy	vijand
次	つぎ	next	volgende;volgende keer;daarna;keer;volgorde;nummer
活動	かつどう	activity	activiteit
点	てん	respect;way;scores;score;grades;dots;grade;dot;percent;point;points;regard;item	doelpunt;puntjes;opzichte;punt;stip;stuk
無くなります	なくなります	disappear;be lost;run out;vanish;be gone;be used up	verdwijnen;ophouden;ontbreken;verloren gaan;uitputten;opraken
申し込みます	もうしこみます	apply;subscribe;request;sign up;register;enroll	aanmelden;inschrijven;aanvragen;reserveren;solliciteren
紹介します	しょうかいします	presents;present;introduces	
覚えます	おぼえます	will memorize	
#134	daily routines	daily routines	Everyday Life: Share daily routines	Dagplan: Stel je dagplanning op
う	=	u	u
きちんとした	=	tidy	net
よう	=	so that	manier;wijze;manier van;wijze van;alsof;schijn;uiterlijk;vorm;stijl;patroon;manier waarop;zoals;ongeveer;richting;doel;bedoeling;bedoeling hebben te;van plan zijn te
付き合います	つきあいます	associate with;date;keep company with;go out with;accompany;socialize with;go along with	omgaan met;verkering hebben met;meegaan met;samenzijn met;meedoen met;deelnemen aan
伝えます	つたえます	tell;will convey	overbrengen;meedelen;doorgeven;vertellen;communiceren
健康	けんこう	health	gezondheid
協力します	きょうりょくします	cooperate;collaborate;assist;work together;help;support	samenwerken;meewerken;helpen;bijdragen;hulp bieden
夜遅く	よるおそく	late at night	laat in de nacht
大丈夫	だいじょうぶ	okay	oké
寄ります	よります	stop	stoppen;langsgaan;binnenlopen;naderen;benaderen;leunen
思っています		is thinking;am thinking;feel;thinks	ben van plan
来よう		come;will come;let's come;shall we come	komen;terugkomen;weerkomen
横断歩道	おうだんほどう	crosswalk	zebrapad
気になります	きになります	to be concerned about;to worry about;to be curious about;to care about;to feel uneasy about;to be on one's mind;to be interested in;to catch one's attention	zich zorgen maken;bezorgd zijn;geïnteresseerd zijn;aan het denken zijn over;zich aantrekken van;nieuwsgierig zijn naar;interesse hebben in
気を付けます	きをつけます	be careful;take care;watch out;pay attention;be cautious;be mindful of;watch out for;take care of	oppassen;uitkijken;voorzichtig zijn;opletten;letten op
浅草		Asakusa;neighborhood;district;area	Asakusa
神戸	こうべ	Kobe	Kobe
絵本	えほん	picture book	prentenboek
銀行員	ぎんこういん	bank clerk	bankmedewerker
電気を消します		turn off the light;switch off the light;extinguish the light;put out the light;turn off the electricity;switch off the electricity;extinguish the electricity;put out the electricity	het licht uitdoen;het licht uitzetten;de lamp uitdoen;de lamp uitzetten
#135	celebrations	celebrations	Village: Get ready for a party	Feest: Vertel over het feest
いいところ	=	good point	goede kant
うまく	=	well	goed
にくい	=	difficult to;hard to;tough to	moeilijk;lastig;moeilijk te;lastig te
びっくりします	=	be surprised;be startled;be shocked;be amazed;be astonished	schrikken;zich verbazen;verbaasd zijn;verrast zijn;versteld staan
不快な		unpleasant	onaangenaam
不自由な人		disabled person;handicapped person;person with a disability;physically challenged person;person with mobility issues;hard of hearing;hearing impaired	mensen met een beperking
今晩	こんばん	this evening	vanavond
光ります	ひかります	shine;glitter;sparkle;gleam;glow	schijnen;glanzen;schitteren;stralen
六番目		sixth	zesde
彼氏	かれし	boyfriend	vriend
情報	じょうほう	information	informatie
捨てます	すてます	throw away;discard;abandon;give up;dump;dispose of	
料理します	りょうりします	to cook;cooks;cook	koken;bereiden;klaarmaken;maken
断ります	ことわります	say no	weigeren;afwijzen;afslaan;bedanken
村	むら	village	dorp
記号	きごう	symbol	symbool
記念日	きねんび	anniversary	herdenkingsdag
誕生日	たんじょうび	birthday	verjaardag
遊園地	ゆうえんち	amusement park	pretpark
音楽を流します		will play music;plays music	muziek afspelen;muziek laten horen;muziek draaien;muziek uitzenden
#136	chores	chores	Home Life: Ask for help with chores	Huishouden: Vraag om hulp met taken
あいさつ	=	greeting	begroeting
お客様	おきゃくさま	customer	klant
くれます	=	for me;gives;give	geven;schenken;vertellen;laten weten
コウモリ	=	bat	vleermuis
トラブル	=	trouble	probleem
十八番目		eighteenth	achttiende
向こう	むこう	across;the other side	overkant;daar;aan de overkant;tegenover;die kant;verderop
安心します	あんしんします	feel relieved;be at ease;feel reassured;relax;feel safe;feel comfortable	geruststellen;gerust zijn;zich op zijn gemak voelen;gerustgesteld worden;zich veilig voelen
家族	かぞく	family	familie
幅	はば	width	breedte
干します	ほします	dry;air;hang	
散らかっています		is messy;is a mess	
時々	ときどき	sometimes	soms
果物	くだもの	fruit	fruit
洗濯	せんたく	laundry	was
王女	おうじょ	princess	prinses
薬を飲みます		take medicine;take drugs;take pills;take medication	
表示	ひょうじ	label	aanduiding
電池	でんち	battery	batterij
#137	seasonal changes	seasonal changes	Seasons: Talk about the seasons	Seizoenen: Vertel over het seizoen
くします	=	comb;arrange;tidy;groom;make;shorten	kammen;kam;borstelen;verzorgen;maken;doen
くなります	=	become;get;grow;turn;change into;improve	worden;raken;duurder worden;willen;verlangen naar
こうずい	=	flood	overstroming
よくします	=	improve;make better;enhance;treat well;take good care of	verbeteren;verzorgen;goedmaken;helpen
トンネル	=	tunnel	tunnel
一応	いちおう	for the time being	voorlopig
回ります	まわります	revolve	draaien;rondgaan;omkeren;ronddraaien;circuleren;lopen;bezoeken
季節	きせつ	season	seizoen
心地いい	ここちいい	comfortable;pleasant;cozy;agreeable;nice;relaxing;soothing	comfortabel;prettig;aangenaam;fijn;behaaglijk;gezellig
植えます	うえます	plant;put in;grow;set;transplant	planten;zetten;aanplanten;in de grond zetten
気温	きおん	temperature	temperatuur
涙	なみだ	tear	traan
生物学	せいぶつがく	biology	biologie
産業	さんぎょう	industry	industrie
祖父	そふ	grandfather	grootvader
簡単	かんたん	easy	eenvoudig
自分	じぶん	oneself	zelf
見本	みほん	sample	voorbeeld
言語	げんご	language	taal
近づきます	ちかづきます	approach;get close;come near;draw near;advance	naderen;dichterbij komen;benaderen;toenaderen
預けます	あずけます	I will leave	toevertrouwen;achterlaten;in bewaring geven;afgeven;storten;deponeren
鼻	はな	nose	neus
#138	professional life	professional life	Community: Describe your community	Collega: Bespreek werk met je collega
ほこり	=	dust	stof
コミュニケーション	=	communication	communicatie
マッチ	=	match	lucifer
久しぶりに	ひさしぶりに	after a long time	na lange tijd
厳しい	きびしい	harsh;strict;severe;hard;cruel	kritisch
合図	あいず	signal	sein
同僚	どうりょう	colleague	collega
実家	じっか	parents' home	ouderlijk huis
帽子	ぼうし	hat	hoed
恋愛	れんあい	romance	romantiek
成績	せいせき	results;grades;marks;grade	resultaat;prestatie;cijfer;score;beoordeling
秋葉原		Akihabara	
組織	そしき	organization	organisatie
結婚します	けっこんします	marry;get married;wed;tie the knot	
職場	しょくば	workplace	werkplek
胸	むね	chest	borst
要ります	いります	need	
話しやすい		easy to talk with	gemakkelijk te praten;makkelijk in de omgang;toegankelijk;benaderbaar;prettig om mee te praten;comfortabel om mee te praten
通り	とおり	street	straat
駐車場	ちゅうしゃじょう	parking lot	parkeerplaats
#139	free time	free time	Experiences: Describe things you tried	Ervaring: Vertel over je ervaring
での	=	at;on;in	bij;op;in;met;tijdens;tijdens het;bij het
みます	=	tries;watch	kijken;zien;bekijken;onderzoeken;proberen
リラックスします	=	relax;unwind;chill out;take it easy;take it slow;rest	
体験	たいけん	experience	ervaring
例えば	たとえば	for example	bijvoorbeeld
冷凍	れいとう	frozen	diepvries
十七番目		seventeenth	zeventiende
十年間		ten years	tien jaar
厚い	あつい	thick	dik;warm;hartelijk;diep;intens
取り組みます	とりくみます	tackle;deal with;work on;address;engage in;grapple with;work hard;put effort into	
回復します	かいふくします	recover;regain;restore;heal;improve;return	
契約	けいやく	contract	contract
手順	てじゅん	procedure	procedure
絵の具	えのぐ	paint	verf
美術	びじゅつ	art	kunst
裏	うら	back	achterkant
調子が悪い	ちょうしがわるい	not feeling well;in bad condition;out of order;unwell;off;sick;malfunctioning;feeling unwell;feeling sick	
谷	たに	valley	vallei
趣味	しゅみ	hobby	hobby
輸出します	ゆしゅつします	export;ship out;send abroad	
降ります	おります	get off;will get off;gets off;will disembark;rains;disembark;snows;is getting off	
#140	describing events	describing events	Artists: Invite friends to events	Evenement: Doe mee aan vrijwilligerswerk
されます	=	do;be done;perform;carry out;be performed;be carried out;announce;be announced;publish;be published	worden gedaan;gedaan worden;uitgevoerd worden;gepubliceerd worden;aangekondigd worden
だと思いました		I thought that;I believed that;I considered that;I assumed that;I felt that;I felt like;I figured	ik dacht dat;ik vond dat;ik meende dat;ik geloofde dat
れます	=	can;be able to;potential form auxiliary verb;used;is used;are used	kunnen;mogen;krijgen;worden;worden gezegd
チャリティー	=	charity	liefdadigheid
一本	いっぽん	one	één
作品	さくひん	work	werk
同い年	おないどし	the same age	even oud
増やします	ふやします	increase;add;raise;multiply;augment	vergroten;verhogen;vermeerderen;uitbreiden;doen toenemen;toevoegen
手入れ	ていれ	maintenance	onderhoud
担当	たんとう	responsibility	verzorgen;verantwoordelijkheid;afdeling;beheren;opdracht;functie;taak;verantwoordelijke
文化祭	ぶんかさい	cultural festival	cultuurfestival
最近	さいきん	these days;recently;as of late;lately;recent;nowadays	onlangs;recent;laatst;de laatste tijd;tegenwoordig
期間	きかん	period	periode
来られます		can come;be able to come;come;arrive;attend	komen;kunnen komen;arriveren;bezoeken;aanwezig zijn
構いません	かまいません	do not mind;don't mind;it doesn't matter	het maakt niet uit;geen bezwaar;geen probleem;geeft niet;maakt niet uit;mogen;toegestaan;prima
環境	かんきょう	surroundings;environment;environmental;environments	omgeving;milieu;leefomgeving;context
画家	がか	painter	schilder
窓	まど	window	raam
誘います	さそいます	I invite;invite	
#141	social media	social media	Online Life: Make plans in a group chat	Berichten: Stuur een groepsbericht
めす	=	female	vrouwelijk dier
アンケート	=	survey	enquête
グループチャット	=	group chat	groepschat
バレバレ	=	obvious	overduidelijk
便利	べんり	convenient	handig
八本	はちほん	eight	acht
受け入れます	うけいれます	accept;receive;admit;embrace;accommodate;take in	
届きます	とどきます	arrive	aankomen;bereiken;bezorgen;afleveren;binnenkomen;ontvangen
成功	せいこう	success	succes
戻ります	もどります	return to;will return;will be back;return	
楽	らく	easy;relaxing	plezierige
楽しい	たのしい	pleasant;enjoyable;a pleasure;amusing;fun;entertaining	leuk;plezierig;gezellig;amusant;vrolijk;feestelijk
絵	え	picture	tekening
習慣	しゅうかん	custom	gewoonte;gebruik;routine;traditie
見張ります	みはります	watch;guard;keep watch;stand guard;look out;monitor;keep an eye on	
観光をします		to sightsee;to go sightseeing;to tour;to visit tourist attractions	
返信します	へんしんします	reply;respond;answer	antwoorden;terugschrijven;beantwoorden;terugmailen
面白い	おもしろい	interesting;funny	interessant;leuk;amusant;boeiend;grappig
#142	city life	city life	Objects: Talk about issues with equipment	Vrienden: Vraag hulp aan vrienden
どこでも	=	anywhere	overal
ひかれます	=	pull;attract;draw;be charmed;be fascinated;be attracted to;be drawn to	
スキャナー	=	scanner	scanner
ポンプ	=	pump	pomp
前に	まえに	before	voor
口が悪い	くちがわるい	sharp-tongued;foul-mouthed;bad-mouthed;rude;harsh-speaking;blunt	
大人しい	おとなしい	quiet	
疑います	うたがいます	doubt;suspect;distrust;question;disbelieve	
茶わん	ちゃわん	tea bowl	
警察官	けいさつかん	police officer	politieagent
黄色い	きいろい	yellow	geel;gele
#143	personal background	personal background	Milestones: Express feelings about milestones	Oefening: Beschrijf wat je ziet
しょうちょう	=	symbol	symbool
不便	ふべん	inconvenient	onhandig;ongemakkelijk;onpraktisch;ongeschikt;onbruikbaar;lastig;moeilijk
体重を量ります		measure weight;weigh oneself;take body weight;check weight	het gewicht meten;wegen;de lichaamsgewicht meten
信じます	しんじます	believe;believes	geloven;vertrouwen;vertrouwen op;geloof hechten aan
修士号	しゅうしごう	master’s degree	masterdiploma
出ます	でます	is leaving;nose is running;participate;participates;will participate;will leave;I leave;leave;am leaving;get out;leaves;come out;exit;is participating	
実は	じつは	actually	eigenlijk
犯人	はんにん	criminal	dader
発表します	はっぴょうします	presents;announce;present;announcing	
答えます	こたえます	answers	antwoorden;beantwoorden;reageren
肩	かた	shoulder	schouder
腰	こし	lower back	onderrug
自由	じゆう	freedom	vrijheid
落ち着いて		calmly	rustig
鳥居	とりい	torii	torii
#144	personal experiences	personal experiences	Situations: Ask questions at an event	Moment: Vertel over dit moment
かみます	=	bite;chew;gnaw	bijten;kauwen
しょっちゅう	=	frequent	vaak
ショック	=	shock	schok
上げます	あげます	turns up	geven;schenken;verhogen;optillen;aanbieden;opsteken
交通	こうつう	transportation	verkeer
八点		eight items	acht item
勉強できます		can study;able to study;can learn;able to learn;can study quietly;able to study quietly;can study together;able to study together	kunnen studeren;kunnen leren;in staat zijn te studeren;in staat zijn te leren
司会の人		host	presentator
名古屋	なごや	Nagoya	Nagoya
地元	じもと	local	lokaal;plaatselijk;thuisgebied;eigen streek;buurt
平和	へいわ	peaceful	vreedzaam
役に立ちます	やくにたちます	is useful;are useful	nuttig zijn;van nut zijn;behulpzaam zijn;dienstig zijn;bruikbaar zijn;van pas komen
忘れます	わすれます	forgets;forget	vergeten
悪い	わるい	bad;poor;at fault;badly	slecht
終わらせます		finish;end;complete;conclude;terminate;finish up	
緊張します	きんちょうします	to be nervous;to be tense;to be anxious;to feel pressure;to be strained;to feel nervous	gespannen zijn;nerveus zijn;spanning voelen;zenuwachtig zijn
逃げ出します	にげだします	run away;escape;flee;bolt;break out;run off;take flight	wegrennen;ontsnappen;ervandoor gaan;vluchten;weglopen
連れて来ます		bring;brings	meenemen;brengen;meebrengen;halen
#145	school life	school life	Friends: Talk about survey results	Gezondheid: Geef je mening
お祈り	おいのり	prayer	gebed
この前	このまえ	the other day	onlangs
そういうふうに	=	in that way	op die manier
その後	そのあと	after that	daarna
先輩	せんぱい	senior	senpai
六点		six items	zes stuks
北西	ほくせい	northwest	noordwest
大阪	おおさか	Osaka	Osaka
怒ります	おこります	get angry;become angry;be angry;get mad;become mad;be mad;lose temper	
怖がらせます		scare;frighten;intimidate;alarm;terrify;startle	bang maken;angst aanjagen;laten schrikken
態度	たいど	attitude	houding
病気	びょうき	illness	ziekte
試合	しあい	match	wedstrijd
調査	ちょうさ	investigation	onderzoek
電子レンジ	でんしレンジ	microwave	magnetron
順番	じゅんばん	order	volgorde
魔法	まほう	magic	magie
#146	sports	sports	Daily Life: Describe your morning routine	Team: Overleg met je team
ために	=	for the purpose of	voor
チャンピオン	=	champion	kampioen
乾杯します	かんぱいします	to toast;to cheers;to drink a toast;to make a toast	
切手	きって	stamp	postzegel
動き	うごき	movement	beweging
参加します	さんかします	take part;participate;enters	
困っています		troubled;worried;in trouble;distressed;having difficulty;having trouble	in de problemen zitten;in moeilijkheden verkeren;hulp nodig hebben;verontrust zijn;zich zorgen maken;moeite hebben;problemen ondervinden
小道	こみち	path	paadje
屋内	おくない	indoor	binnen
探します	さがします	look for;search for;searches for;looks for;find	zoeken;zoeken naar;opsporen;speuren;vinden
洋食	ようしょく	Western-style food	Westerse gerechten
牛乳	ぎゅうにゅう	milk	melk
船	ふね	ship	schip;schepen
薬局	やっきょく	pharmacy	apotheek
謝ります	あやまります	apologize	
関係	かんけい	relationship;dealings;relations;connection;relation;to do with	relatie;verband;betrekking
飛行機	ひこうき	airplane	vliegtuig
高さ	たかさ	height	hoogte
#147	neighborhoods	neighborhoods	Community: Ask a neighbor for help	Huizen: Vertel over je huisregels
あちこち	=	here and there	hier en daar
たまたま	=	by chance	toevallig
ゆるい	=	loose	los;slap;ruim;wijd;zacht;licht
スタート	=	start	start
ラフ	=	rough draft	schets
不安	ふあん	uneasy	onzeker
仲がいい	なかがいい	be close;get along well;be on good terms;be friendly;be intimate;be harmonious	goed met elkaar zijn;een goede relatie hebben;hecht zijn;close zijn;goed bevriend zijn;goed verbonden zijn;een hechte band hebben
冷蔵庫	れいぞうこ	refrigerator	koelkast
学士号	がくしごう	bachelor's degree	bachelor
温い	ぬるい	lukewarm;tepid;mild;lenient;slack;slow;warm	lauw;lauwwarm;warm;matig;mild;zacht
種類	しゅるい	type	soort
経済学	けいざいがく	economics	economie
自動ドア	じどうドア	automatic door	automatische deur
薄く		thinly	dun
話し合い	はなしあい	discussion	bespreking
速い	はやい	fast;rapid;quick	snel;vlug;rap;gauw;spoedig;vlot
連絡します	れんらくします	contact;get in touch;communicate;inform;notify;call;reach out	contact opnemen;contacteren;bereiken;informeren;melden;terugbellen;laten weten
運動します	うんどうします	exercise	bewegen;sporten;oefenen
開きます	ひらきます	am going to throw;are going to throw;opens;will open;open;throw	
音	おと	sound	geluid
#148	babysitting	babysitting	Children: Talk with children	Kinderen: Vraag naar favoriete snacks
おやつ	=	snack	tussendoortje
くちびる	=	lip	lippen
じゃないと	=	unless	anders
シッター	=	sitter	oppas
仲良くなります		become friends;get along;become close;make friends;grow closer	bevriend raken;goede vrienden worden;een goede relatie krijgen;beter met elkaar opschieten
教室	きょうしつ	classroom	lokaal
点数をつけます		to score;to grade;to mark;to assign points;to rate;to evaluate	punten geven;scoren;beoordelen;een score toekennen;punten toekennen;evalueren
真似します	まねします	imitate;mimic;copy;emulate;impersonate;repeat	imiteren;nadoen;nabootsen;kopiëren
着物	きもの	kimono	kimono
聞きます	ききます	listen to;ask;listens to;hears;listens;listen	
詩	し	poetry	gedicht
質がいい	しつがいい	good quality;high quality;excellent quality;fine quality;durable;well-made	van goede kwaliteit;kwalitatief goed;hoogwaardig;goed gemaakt;degelijke kwaliteit;goed;prima;uitstekend
質が悪い	しつがわるい	low quality	van slechte kwaliteit;slecht;inferieur;ondermaats;gebrekkig;slecht gemaakt;van mindere kwaliteit
迎えに来ます		pick ... up	komen ophalen;halen
遊びます	あそびます	play;will play;plays;hang out	
銀	ぎん	silver	zilver
面倒を見ます	めんどうをみます	take care of;look after;take responsibility for;attend to;care for;watch over;babysit	zorgen voor;verzorgen;oppassen op
頼みます	たのみます	will ask;ask	vragen;verzoeken;smeken;vertrouwen;toevertrouwen
#149	eating habits	eating habits	Snacks: Discuss your food habits	Gezondheid: Vertel over je eetgewoonten
いました	=	was;there were;stayed;have been;were;had;there was	waren;was
お菓子	おかし	snack	snack
ずっと	=	the whole time;always;more;far;constantly;continuously;much;all the way;continuous	altijd;voortdurend;de hele tijd;steeds;veel;onafgebroken;continu
のころ	=	time of;around;about;when;at the time of;in the days of;during;near;approximately;childhood;when I was a child	toen ik een kind was
努力します	どりょくします	make an effort;try hard;strive;endeavor;work hard;put in effort;exert oneself	
外食	がいしょく	eat out	uit eten gaan
大根	だいこん	daikon	daikon
小麦粉	こむぎこ	flour	bloem
弁当	べんとう	bento	bento
後ろ	うしろ	at the back	achter
患者	かんじゃ	patient	patiënt
昼寝します	ひるねします	take a nap;nap;have a nap;doze;snooze;take a siesta	
玉ねぎ	たまねぎ	onion	ui
瓶	びん	bottle	fles
研究室	けんきゅうしつ	laboratory	laboratorium
興味があります		is interested;has an interest;are interested	
電話番号	でんわばんごう	phone number	telefoonnummer
#150	living spaces	living spaces	Home: Suggest weekend activities	Thuis: Bespreek weekendplannen
には	=	by the;there is... to...;for the;in the;about the;to the;at the;on the	in
まとめ	=	summary	samenvatting
アシスタント	=	assistant	assistent
ベランダ	=	balcony	balkon
今週末	こんしゅうまつ	this weekend	dit weekend
原因	げんいん	cause	oorzaak
友達	ともだち	friend	vriend
叩きます	たたきます	to hit;to strike;to beat;to knock;to tap;tataku	
家具	かぐ	furniture	meubilair
本棚	ほんだな	bookshelf	boekenkast
机	つくえ	desk	bureau;bureaus;bureaublad
毎週末		every weekend	elk weekend
砂	すな	sand	zand
組み立てます	くみたてます	assemble;build;construct;put together	
脂っこい	あぶらっこい	greasy;oily;fatty;rich;heavy	
若い	わかい	young	jong;jeugdig;jongvolwassen
遊歩道	ゆうほどう	promenade	wandelpad
#151	moving	moving	Daily Scenes: Share safety tips	Leven: Vertel over wonen in de stad
という	=	called	dat
よゆうがあります	=	to have leeway;to have room;to have margin;to have time;to have capacity;to have allowance;to have surplus;to have flexibility;to have availability;to have spare time	
アウトドア派	アウトドアは	outdoor-oriented	buitenmens
助かります	たすかります	to be saved;to be helped;to be rescued;to be relieved;to be useful;to be helpful	helpen;redden;van dienst zijn;nuttig zijn;voordeel opleveren;van hulp zijn
守ります	まもります	will keep;protects	
広告	こうこく	advertisement	advertentie
建築家	けんちくか	architect	architect
必要	ひつよう	necessary	nodig;noodzakelijk
数学	すうがく	mathematics	wiskunde
期末試験	きまつしけん	final exam	eindtoets
水泳	すいえい	swimming	zwemmen
田舎	いなか	countryside	platteland
知らない人		stranger	onbekende
缶	かん	can	blik
都会	とかい	urban	stad
#152	outdoor activities	outdoor activities	Group: Plan a group camping trip	Groep: Bespreek plannen met je groep
しかたない	=	it can't be helped;unavoidable;no choice;inevitable;there's nothing to be done;hopeless;resigned;can't be helped;nothing can be done	het kan niet anders;onvermijdelijk;niet te vermijden;het is niet anders;er is geen andere manier;het is onvermijdelijk;het is niet te voorkomen
グループ	=	group	groep
ミス	=	mistake	fout
交換	こうかん	exchange	vervanging
八泊		eight-night	acht nacht
削ります	けずります	shave;sharpen;whittle;scrape;cut down;reduce;scrape off;trim	slijpen;puntenslijpen;schaven
向かいます	むかいます	coming	gaan naar;zich richten op;lopen naar;afslaan naar
小説	しょうせつ	novel	roman
文句	もんく	complaint	klacht
生徒	せいと	student	leerling
白黒	しろくろ	black and white	zwart-wit
着きます	つきます	get;arrive;will arrive;arrives	aankomen;arriveren;bereiken
許可	きょか	permission	toestemming
詰めます	つめます	to pack;to fill;to stuff;to shorten;to compress;to work hard;to press;to put in;to load	vullen;stoppen;inpakken;dichtdoen;opvullen;inladen;pakken
迷います	まよいます	to get lost;to hesitate;to be puzzled;to waver;to be uncertain;to lose one's way	twijfelen;aarzelen;verdwalen;onzeker zijn;besluiteloos zijn;verdwaald raken
都合がいい	つごうがいい	convenient	handig;geschikt;gunstig;praktisch;passend;beschikbaar
#153	commuting	commuting	Station: Stop by before work	Werkdag: Vertel over je ochtendroutine
しまいます	=	will end up	afmaken;versturen;opruimen;onthouden;stoppen
すぎます	=	is too;tastes too;are too	voorbijgaan;overschrijden;te veel zijn;overdrijven;passeren;te veel kopen
もし	=	if;supposing	Als
一個	いっこ	one	één
今も	いまも	still	nog steeds
体育	たいいく	physical education	lichamelijke opvoeding
出かけます	でかけます	go out;goes out;will go out	
向こうに		on the other side of	aan de andere kant
提供します	ていきょうします	offers	
混みます	こみます	to be crowded;to be packed;to get congested;to be full;to be crowded with people;to get busy	druk zijn;vol zijn;druk worden;vol raken;overvol zijn
渋谷	しぶや	Shibuya	Shibuya
確かに	たしかに	certainly	inderdaad
繋げます	つなげます	connect;link;tie;join;attach;plug in;connect to	verbinden;koppelen;aansluiten;vastmaken
訳します	やくします	translate;interpret;render;explain	vertalen;uitleggen;interpreteren;verklaren
通勤	つうきん	commute	woon-werkreis
遅れます	おくれます	will be late;is delayed	vertragen;te laat komen;achterblijven;uitstellen;aankomen met vertraging
遅刻	ちこく	lateness	te laat komen
郵便局	ゆうびんきょく	post office	postkantoor
雇います	やといます	employ;hire;engage;take on;recruit	inhuren;aanwerven;in dienst nemen;aannemen
電池が切れます		battery runs out;battery dies;battery is dead;battery goes flat;battery is exhausted;battery runs down;run out of battery	de batterij is leeg;de batterij is op;de batterij is uitgeput;de batterij is leeggeraakt;de batterij is leeggelopen;de batterij raakt leeg
駅員	えきいん	station attendant	stationsmedewerker
#154	gatherings	gatherings	Gathering: Ask about family roles	Familie: Vertel over je familie
いいですよ	=	It's good;That's fine;It's okay;Sure;No problem;That's all right;Sounds good;You don't have to	goed;prima;is goed;oke;in orde;hoeft niet;hoeft niet te
お腹が空きました		I am hungry	
で乗りかえます		transfer;change trains;change buses;switch trains;switch buses	
具合が悪い	ぐあいがわるい	do not feel well;sick;feel unwell;is not good	zich slecht voelen;niet goed zijn;ziek zijn;onwel zijn;zich niet lekker voelen
十本	じっぽん	ten	tien
双子	ふたご	twin	tweeling
役割	やくわり	role	rol
残ります	のこります	remain;be left;stay;remain behind;be leftover;remain undone	overblijven;achterblijven;blijven;overhouden;resteren;blijven hangen
研究者	けんきゅうしゃ	researcher	onderzoeker
置きます	おきます	put;will put;puts;put ... down	
誰の		whose	wiens
迎えます	むかえます	to welcome;to greet;to meet;to go out to meet;to receive;to pick up	
首	くび	neck	nek
#155	roommates and co-living	roommates and co-living	Living: Agree on house rules	Woning: Bespreek huisregels
お土産	おみやげ	souvenir	souvenir
お年寄り	おとしより	elderly person	oudere
ければよかった	=	I wish I had;should have;if only I had;it would have been better if;had only;I shouldn't have;I wish I hadn't	had moeten;was beter geweest;had ik maar;had ik moeten;had ik beter moeten;had niet moeten;had ik niet moeten;had beter niet
すれば	=	if	doen;maken;uitvoeren;handelen;verrichten;samenwerken
できれば	=	if possible	als het mogelijk is
ばよかった	=	should have;wish had;would have been better to;had better have;ought to have	had moeten;was beter geweest;had beter kunnen;had maar;had ik maar gedaan;had ik maar gevraagd;had ik maar geluisterd;had ik maar gepraat;had ik maar schoongemaakt;had ik maar opgeruimd;had ik maar gestudeerd;had ik maar geoefend;had ik maar besloten
ればよかった	=	should have;wish had;ought to have;had better have;should have done	had moeten;was beter geweest;had ik maar;had je maar;had hij maar;had ik maar gedaan;had ik maar genomen;had ik maar gezien
予定	よてい	plan	plan
公式	こうしき	official	officieel
教授	きょうじゅ	professor	hoogleraar
普通	ふつう	an ordinary;normal;average;a regular;ordinarily;typically;usually;in general;normally;usual;typical	gewoon;normaal;gebruikelijk;alledaags;standaard
暇な時	ひまなとき	free time	vrije tijd
暮らします	くらします	live;reside;make a living;get along;spend time;live together	leven;wonen;verblijven;doorbrengen
治療	ちりょう	treatment	behandeling
火	ひ	fire	vuur
目標	もくひょう	goal	doel
#156	time periods	time periods	Events: Share study abroad experiences	Uitje: Vertel over je uitje
せきたん	=	coal	steenkool
九番目		ninth	negende
八冊		eight	
出てきます		has;come	komen;tevoorschijn komen;verschijnen;naar buiten komen;opduiken
動物園	どうぶつえん	zoo	dierentuin
取ります	とります	take;takes	
名札	なふだ	name tag	naamkaartje
実用的	じつようてき	practical	praktisch
数日	すうじつ	several days	enkele dagen
昔の		old	oud
留学	りゅうがく	study abroad	studie in het buitenland
筋肉	きんにく	muscle	spier
自信があります		to be confident;to have confidence;to be self-assured;to be confident about	
説明します	せつめいします	explain;explains	
起こります	おこります	arise;happen;occur;take place;come about;break out	
過ぎます	すぎます	too much	
道具	どうぐ	tool	gereedschap
#157	personal goals	personal goals	Daily Life: Describe your daily routine	Dagboek: Beschrijf je dag
お互い	おたがい	each other	elkaar
ければ	=	if	als;indien;wanneer;mits
であれば	=	I were;if I am	als;indien;wanneer;mits
ば	=	should;we'd	plaats;paarden
びっくりするほど	=	astonishingly	verbazingwekkend
やる気	やるき	motivation	motivatie
よければ	=	if ... want;if that is okay;if ... wants;good	goed
れば	=	if	als;indien;wanneer;mits;zodra
予約します	よやくします	make a reservation;reserve;reserves;book	
十冊		ten books	tien boeken
増えます	ふえます	increase;grow;multiply;rise;expand;get	toenemen;groeien;vermeerderen;stijgen
影響力	えいきょうりょく	influence	invloed
快適	かいてき	comfortable	comfortabel
日記	にっき	diary	dagboek
普通列車	ふつうれっしゃ	local train	stoptrein
曲げます	まげます	bend;curve;twist;flex	buigen;krommen;plooien
案内します	あんないします	show ~ around	
段階	だんかい	stage	fase
状態	じょうたい	condition	toestand
生	なま	live;life;student;uncooked;raw;unmodified	leven
答え	こたえ	answer	antwoord
鳥	とり	bird	vogel
#158	workplace communications	workplace communications	Preparation: Share your project goals	Kantoor: Bespreek het project
によって	=	depending on	afhankelijk van
ゴミ袋	ごみぶくろ	garbage bag	vuilniszak
シンプル	=	simple	simpel
一人ひとり	ひとりひとり	each individual	ieder individu
上司	じょうし	boss	baas
信じられない	しんじられない	cannot believe it;incredibly;unbelievable;hard to believe;outrageous	
図	ず	diagram	figuur
奥	おく	back	binnenste;diepte;binnenkant;binnengebied
思いどおりに		as expected	zoals verwacht
意味	いみ	meaning	betekenis
整理された		organized	geordend
有名	ゆうめい	famous	beroemd
模様	もよう	pattern	patroon
物	もの	thing	ding
王子	おうじ	prince	prins
芸術的	げいじゅつてき	artistic	
連絡	れんらく	message	bericht
#159	cost of living	cost of living	Home Life: Share your home routines	Woning: Beschrijf je woning
かなり	=	considerably	tamelijk
ご両親	ごりょうしん	your parents	uw ouders
との	=	with;against;and	met;en;samen met;aan;van
どんどん	=	rapidly	steeds sneller
のに	=	in order to;although;even though;in order for	hoewel;ondanks;toch;maar;hoewel dat
カップ麺	カップめん	cup noodles	beker noedels
フレーム	=	frame	lijst
一緒に	いっしょに	together	samen
今後	こんご	from now on	in de toekomst
伝統	でんとう	tradition	traditie
優先します	ゆうせんします	prioritize;give priority to;prefer;put first;take precedence over;favor	
公平	こうへい	fair	eerlijk
千葉	ちば	Chiba	
家賃	やちん	rent	huur
手紙	てがみ	letter	brief
操作します	そうさします	operate;manipulate;control;handle;manage;use	
犯罪	はんざい	crime	misdaad;misdrijf;criminaliteit
眠れません		cannot sleep;can't sleep	
税金	ぜいきん	tax	belasting
言葉	ことば	word	woord
#160	medical care	medical care	Hospital: Share your hospital experience	Gezondheid: Geef je mening over leraren
させます	=	make;makes	
さらに	=	furthermore	verder
ちゃんとした	=	proper	degelijk
てんてき	=	IV drip	infuus
という感じ		impression feeling sense	gevoel
不規則	ふきそく	irregular	onregelmatig
事	こと	thing;matter	zaak
以内	いない	within	
似合います	にあいます	suit;match;look good on;become;fit;look nice;look great	
十四番目		fourteenth	veertiende
待合室	まちあいしつ	waiting room	wachtkamer
教育	きょういく	education	onderwijs
最先端	さいせんたん	state-of-the-art	geavanceerd
来させます		make come;let come;have come;cause to come;bring	
流行っています		to be in style;are in style	in de mode zijn;populair zijn;gangbaar zijn;trendy zijn;heersen;in zwang zijn
発明	はつめい	invention	uitvinding
看護師	かんごし	nurse	verpleegkundige
隅	すみ	corner	hoek
#161	directions 2	directions 2	Directions: Ask for directions	Stad: Vertel waar je heen gaat
いきます	=	live;go;goes	gaan;lopen;reizen;vertrekken;komen;vliegen
お腹がいっぱい		full	vol
デザイナー	=	designer	ontwerper
上野公園		Ueno Park	
交差点	こうさてん	intersection	kruispunt
到着します	とうちゃくします	will arrive;arrives	
台湾	たいわん	Taiwan	
地下	ちか	basement	kelder
市役所	しやくしょ	city hall	stadhuis
心が広い	こころがひろい	generous;open-minded;broad-minded;tolerant;big-hearted;kind;understanding;forgiving;patient	
放課後	ほうかご	after school	na schooltijd
方向	ほうこう	direction	richting
曲がります	まがります	turn	
理想的	りそうてき	ideal	ideaal
由来	ゆらい	origin	oorsprong
確かめます	たしかめます	confirm;verify;check;ascertain;make sure;check again;double-check	
苦い	にがい	bitter	bitter;wrang
角	かく	corner	hoek
隣	となり	next to	buur
高速道路	こうそくどうろ	highway	snelweg
#162	aspirations	aspirations	Goals: Set team goals	Toekomst: Bespreek je plannen
あこがれます	=	long for;yearn for;admire;aspire to;desire;respect;look up to	verlangen;bewonderen;verlangen naar;bewondering hebben voor;opkijken naar
セット	=	set	set
夢	ゆめ	dream	droom
完全に		completely	volledig
将来	しょうらい	future	toekomst
広い	ひろい	wide;large;big;spacious	ruim;wijd;breed;uitgestrekt;groot
広げます	ひろげます	spread;expand;extend;open;broaden;widen;lay out	uitbreiden;verspreiden;uitspreiden;openen;vergroten
戦います	たたかいます	fights	
挑戦します	ちょうせんします	try	uitdagen;proberen;een uitdaging aangaan;trachten;wagen;aangaan
接続	せつぞく	connection	verbinding
洗濯機	せんたくき	washing machine	wasmachine
活発	かっぱつ	lively	actief
準備します	じゅんびします	prepares	
目指します	めざします	aim;aspire;target;seek;go for;pursue	mikken;streven;richten;beogen;nastreven;willen worden
真剣な		serious	serieus
語学学校		language school	taalschool
途中で		in the middle of	halverwege
#163	future plans	future plans	Results: Give reasons for choices	Voorbereiding: Leg uit hoe je je voorbereidt
こうきしんがつよい	=	curious;inquisitive;eager to learn;highly curious;very curious;eager	
し	=	play;have;four;and;city;do	en
つばさ	=	wing	vleugel
のせいにします	=	blame;attribute;put the blame on;hold responsible;blame on	
めいわくをかけます	=	to bother;to trouble;to inconvenience;to annoy;to cause trouble;to disturb	lastigvallen;storen;overlast bezorgen;hinder veroorzaken;tot last zijn
コピー	=	copy	kopie
リスト	=	list	lijst
似ています		look similar	lijken op;lijken;gelijken;overeenkomen
幸せ	しあわせ	happiness	geluk
成長します	せいちょうします	grow;develop;mature;increase;grow up	
戦争	せんそう	war	oorlog
手に入れます	てにいれます	gets	
折り紙	おりがみ	origami	origami
歯ブラシ	はブラシ	toothbrush	tandenborstel
狙い	ねらい	aim	doel
落ちます	おちます	fall	
靴下	くつした	sock	sokken
#164	friendships	friendships	Friends: Talk about your friends	Vriendschap: Vertel over je vrienden
お疲れ様でした		you did good work;goodbye at work	
こうたくのある	=	glossy;polished;shiny;lustrous;elegant	
また今度	またこんど	another time	een andere keer
シリーズ	=	series	serie
一生	いっしょう	lifelong	levenslang
二十番目		twentieth	twintigste
地球	ちきゅう	Earth	aarde
心配	しんぱい	worry;worrying	zorg;bezorgd
恐ろしい	おそろしい	dreadful;terrible;awful;frightening	
本当の		true	echt
相談します	そうだんします	consult;discuss;talk over;seek advice;ask;confer	
福岡	ふくおか	Fukuoka	
苦手	にがて	weak point;not good at	niet goed in;zwak;slecht in;onhandig;ongemakkelijk
落ち着いた	おちついた	calm	rustig
親友	しんゆう	best friend	beste vriend
観光地	かんこうち	tourist spot	toeristische bestemming
過ごします	すごします	are going to spend;spend;are spending;spends	
韓国	かんこく	South Korean;South Korea;korea	Zuid-Korea;Korea
#165	cooking 2	cooking 2	Kitchen: Ask what's in a dish	Keuken: Vraag naar ingrediënten
かき混ぜます	かきまぜます	stir;mix;scramble;blend;agitate	
せっかく	=	with trouble;specially;especially;taking the trouble to;at great pains;long-awaited;rare opportunity;precious;valuable;hard-earned;carefully;painstakingly;deliberately	moeite;speciaal;met moeite;juist;expres;opzettelijk;met opzet;speciaal voor;met moeite gedaan
びみょう	=	questionable	matig
オーブン	=	oven	oven
スパイス	=	spice	specerij
入っています		contains;have;in	zitten;bevatten;ingaan;binnenkomen;deelnemen
勝ち	かち	win	overwinning
形	かたち	shape	vorm
感謝しています		thank;appreciate;be grateful;express gratitude;grateful;thankful	
混ぜます	まぜます	mix;blend;stir;combine	
炒めます	いためます	fry	
見えてきます		become visible;start to be seen;come into view;appear;begin to appear;come into sight;be seen	
解決します	かいけつします	solve;solves	
逃げます	にげます	escape;run away;flee;avoid;evade	
風景	ふうけい	landscape	landschap
香り	かおり	fragrance	geur
香辛料	こうしんりょう	spice	specerij
#166	crisis response	crisis response	Emergencies: Share safety tips	Voorraad: Bespreek wat je nodig hebt
どんなに	=	no matter how	hoe
の形		shape of	vorm;figuur;model;patroon;structuur
一点	いってん	piece	stuk
一部	いちぶ	partially	gedeeltelijk
二の次	にのつぎ	secondary	tweede rang
六本	ろっぽん	six	zes
処方せん	しょほうせん	prescription	recept
四番目		fourth	vierde
壊れます	こわれます	break;breaks	
天気予報	てんきよほう	weather forecast	
掃除	そうじ	cleaning	schoonmaak
気持ち	きもち	feeling	gevoel
水道	すいどう	water supply	waterleiding
泳ぎます	およぎます	swim;swims	
準備	じゅんび	preparation	voorbereiding
空気	くうき	air	lucht
結果	けっか	result	resultaat
#167	extreme weather events	extreme weather events	Weather: Describe recent weather	Natuur: Vertel over extreem weer
それで	=	so;and;that's	daarmee
たき	=	waterfall	waterval
助け合います	たすけあいます	help each other;cooperate;assist one another;support each other;help one another	
卒業式	そつぎょうしき	graduation ceremony	afstudeerceremonie
大雨	おおあめ	heavy rain	zware regen
宇宙	うちゅう	outer space;the universe	heelal;universum;kosmos;ruimte
掛けます	かけます	cover	
油	あぶら	oil	olie
波	なみ	wave	golf
理由	りゆう	reason	reden
確認します	かくにんします	will make sure;will confirm	
端	はし	edge	rand
細い	ほそい	thin;slim;narrow;fine	dun;smal;slank;fijn;tenger
経験豊富	けいけんほうふ	experienced	ervaren
続きます	つづきます	continue;continues	
議論	ぎろん	discussion	discussie
#168	well-being	well-being	Planning: Make a plan for your day	Gezin: Vertel over je gezin
お子さん	おこさん	child	kind
かなと思います		I wonder if;I think that;I feel like;I suppose that;I guess that;I am wondering if	ik denk dat;ik vraag me af of;ik vermoed dat;ik ben benieuwd of;ik overweeg of;ik denk misschien dat
によると	=	according to	volgens
みりょくてき	=	attractive;charming;fascinating;appealing;captivating;delightful;lovely;pleasant	aantrekkelijk;charmant;boeiend;fascinerend;verleidelijk;gezellig;sfeervol
ように	=	like;that;so that;so as;remember to;not to;as if	zodat;alsof
タップします	=	tap;tap on;touch;press;click	tikken;tappen;aanraken;drukken
印刷します	いんさつします	print;printing	
工学	こうがく	engineering	techniek
感覚	かんかく	sense	zin
提案します	ていあんします	propose;suggest;offer;put forward;present	voorstellen;suggereren;aanbevelen;indienen
明後日	あさって	day after tomorrow	overmorgen
決まった		decided	vast
祖父母	そふぼ	grandparent	grootouders;opa en oma
立ち上がります	たちあがります	stand up;rise;get up;launch;start;take action	
紅葉	こうよう	autumn leaves	herfstbladeren
観客	かんきゃく	audience	toeschouwer
資源	しげん	resource	middel;grondstof;hulpbron;bron;grondstoffen
食事	しょくじ	meal	maaltijd
#169	climate	climate	Supplies: Ask about available supplies	Weer: Praat over het weer
がっかりします	=	be disappointed;feel disappointed;be disheartened;be let down;lose heart;be upset	teleurgesteld zijn;ontmoedigd zijn;verslagen zijn;teleurstelling voelen;teleurgesteld raken
が必要です		need;I need;needs	nodig zijn;noodzakelijk zijn;vereisen;nodig hebben;moeten hebben
くぎ	=	nail	spijker
せいで	=	because of;due to;owing to;on account of;as a result of;because;due to the fact that;as a consequence of	door;vanwege;ten gevolge van;als gevolg van;doordat
でこぼこ	=	bumpy	hobbelig
テラス	=	terrace	terras
凍ります	こおります	freeze;be frozen;ice over;congeal;solidify	bevriezen;vriezen;dichtvriezen
吹きます	ふきます	blows;play	blazen;waaien
喜んで	よろこんで	gladly	graag
大雪	おおゆき	heavy snowfall	zware sneeuwval
宗教的	しゅうきょうてき	religious	religieus
工場	こうじょう	factory	fabriek
材料	ざいりょう	ingredient	ingrediënt
汚します	よごします	to dirty;to pollute;to contaminate;to stain;to soil;to disgrace;to dishonor	bevuilen;vervuilen;besmeuren;bevlekken;vlekken
洗濯物	せんたくもの	laundry	wasgoed
育ちます	そだちます	grow up;be raised;be brought up;develop;mature;grow;thrive	groeien;opgroeien;ontwikkelen
自販機	じはんき	vending machine	automaat
#170	parenting	parenting	School: Describe your school routine	Leven: Bespreek je dagelijkse leven
もう一つは		another	een ander punt is
取っ手	とって	handle	handvat
嫌がります	いやがります	dislike;hate;be unwilling;be reluctant;object to;mind;resent;refuse	vermijden;afwijzen;niet willen;weigeren;tegenzin tonen
家庭	かてい	family	gezin
展示会	てんじかい	exhibition	tentoonstelling
教師	きょうし	teacher	leraar
景色	けしき	view	landschap
特定	とくてい	identified;identify	specifiek;bepaald;vastgesteld;gedefinieerd;concreet
画面	がめん	screen	scherm
疲れます	つかれます	is tiring;it is tiring	moe worden;vermoeid raken;uitgeput raken;moe zijn
自立した		independent	zelfstandig;onafhankelijk;autonoom
血圧	けつあつ	blood pressure	bloeddruk
親	おや	parent	ouder
話題	わだい	topic	gespreksonderwerp
野球	やきゅう	baseball	honkbal
防ぎます	ふせぎます	blocks against	
電気をつけます		turn on the light;switch on the light;light up the light;put on the light;switch the light on;put the light on	het licht aandoen;het licht aanzetten;de lamp aandoen;de lamp aanzetten
#171	traffic	traffic	Outings: Ask for directions	Uitstap: Vraag de weg naar een restaurant
じゅうたい	=	traffic jam	file
ちょうこくか	=	sculptor	beeldhouwer
ブランド	=	brand	merk
事故	じこ	accident	ongeval
人ごみ	ひとごみ	crowd	menigte
危険	きけん	dangerous	gevaarlijk
塩っぱい	しょっぱい	salty	zout;zoutig;gezouten
天ぷら	てんぷら	tempura	tempura
新しくします		renew;update;refresh;make new;replace	vernieuwen;vervangen
昔	むかし	long ago	vroeger
渡ります	わたります	crossing	
着替えます	きがえます	I get dressed;gets dressed	
祖母	そぼ	grandmother	grootmoeder
移動します	いどうします	move	
警察	けいさつ	police	politie
量	りょう	amount	hoeveelheid
#172	gossip and rumors	gossip and rumors	Rumors: Share office rumors	Gerucht: Reageer op een gerucht
うわさ	=	rumor	gerucht
かもしれません	=	possibly;might;may;is possibly	misschien
ただ	=	just	gewoon
どちら	=	which one	welke;welke locatie
タイト	=	tight	strak
一時的	いちじてき	temporary	tijdelijk
何歳	なんさい	how old;what age	hoe oud
分かりました		understood;got it;understand;sure	begreep
北海道	ほっかいどう	Hokkaido	Hokkaido
十一番目		eleventh	elfde
半額	はんがく	half-price	half prijs
広がります	ひろがります	spread;expand;extend;widen;stretch;increase;grow;reach;unfold;open up;diffuse;circulate;propagate;disseminate	
戻します	もどします	return;put back;restore;revert;bring back;give back	
有名人	ゆうめいじん	celebrity	beroemdheid
欠席します	けっせきします	be absent;be absent from;miss;not attend;skip	
特に	とくに	particularly	vooral;met name;in het bijzonder;speciaal
発音	はつおん	pronunciation	uitspraak
覚えておきます		remember;keep in mind;note;memorize;note down;keep track of;remember carefully	
隠します	かくします	hide;conceal;cover;disguise;obscure;withhold	
#173	music	music	Music: Talk about your favorite music	Concert: Praat over klassieke muziek
ながら	=	as;while	terwijl;tijdens
クラシック	=	classical music	klassieke muziek
ピアニスト	=	pianist	pianist
ミュージシャン	=	musician	muzikant
メロディー	=	melody	melodie
リズム	=	rhythm	ritme
側	がわ	side	kant
元気	げんき	energetic	fit
名作	めいさく	masterpiece	meesterwerk
所属しています		belong to;be affiliated with;be a member of;belong;be attached to;belong to a group	behoren tot;lid zijn van;aangesloten zijn bij;deel uitmaken van
時には	ときには	sometimes	soms
決めます	きめます	decides	
燃えます	もえます	is combustible	branden;verbranden;ontbranden;vlammen;opbranden
片付けます	かたづけます	tidy up	opruimen;schoonmaken;ordenen;afhandelen;regelen
言い張ります	いいはります	insist;assert;maintain;claim;stand firm;insist on	volhouden;beweren;vasthouden aan;standvastig zijn;volharden;blijven zeggen
金庫	きんこ	safe	kluis
鋭い	するどい	sharp	scherp;vlijmscherp;feller
録音	ろくおん	recording	opname
電卓	でんたく	calculator	rekenmachine
#174	healthy habits	healthy habits	Habits: Describe your daily habits	Dagelijks leven: Deel gezonde gewoontes
ようにします	=	try to;make sure to;endeavor to;aim to;attempt to;try not to;avoid;make it a habit to	
ようになります	=	become able to;come to;start to;get to;turn out to;begin to	
メッセージ	=	message	bericht
七番目		seventh	zevende
乗り換え	のりかえ	transfer	overstap
仕事を探しています		looking for a job;searching for work;seeking employment;looking for new work;looking for a new job;look for a job	
他に	ほかに	anything else	anders
割引券	わりびきけん	discount coupon	kortingsbon
十点		ten items;ten points	tien items;tien punten
取材します	しゅざいします	cover;gather information;interview;report;collect data	
早起きします	はやおきします	get up early;wake up early;rise early	
権利	けんり	right	recht
氷	こおり	ice	ijs
湖	みずうみ	lake	meer
準備できました		ready;prepared;set;completed;all set	
登録	とうろく	registration	registratie
絶対に	ぜったいに	absolutely	absoluut
薄い	うすい	bland;thin;weak;mild	
調子	ちょうし	condition	toestand
離婚	りこん	divorce	scheiding
#175	safety precautions	safety precautions	Safety: Follow safety instructions	Veiligheid: Stel vragen over veiligheid
はっきりしていません	=	unclear	niet duidelijk zijn;onduidelijk zijn;vaag zijn;niet helder zijn;niet precies zijn
一つずつ	ひとつずつ	one at a time	één voor één
丸い	まるい	round	rond;bolvormig;cirkelvormig;rondachtig
交換します	こうかんします	exchange;swap;replace;trade;switch	
列	れつ	line	rij
合理的	ごうりてき	rational	rationeel
娘	むすめ	daughter	dochter
安全に		safely	veilig
料金	りょうきん	fee	tarief
早めに	はやめに	early	vroeger
武器	ぶき	weapon	wapen
真面目に		seriously	serieus
空手	からて	karate	karate
進みます	すすみます	goes;proceed;go;continue;travels	vooruitgaan;vorderen;doorgaan;bevorderen;opschieten;lopen
願い事	ねがいごと	wish	wens
#176	debate	debate	Topics: Give your opinion	Studenten: Vertel over je klasgenoten
おでん	=	oden	oden
お大事に	おだいじに	take care	beterschap
でしょう	=	are going to;is;haven't;is it not;will likely ... be;it'd;will probably;wasn't;you're;will probably ... be;would probably;right;we'd;am going to;will;aren't;would be;you'll;probably;would;isn't it;you'd	waarschijnlijk;vermoedelijk;zal;zal waarschijnlijk;zal wel;denk ik;nietwaar
コラム	=	column	column
ラッキー	=	lucky	gelukkig
一巻	いっかん	one volume	deel
不自由のある		disabled;handicapped;impaired;people with disabilities;people with mobility challenges	beperkt;met een beperking;gehandicapt;mindervalide
充分	じゅうぶん	sufficient	voldoende
最後に		finally	als laatste
泥	どろ	mud	modder
留学生	りゅうがくせい	international student	uitwisselingsstudent;buitenlandse student;internationale student
直接	ちょくせつ	directly	direct
相手	あいて	opponent;partner	tegenstander;opponent;tegenstandersteam;tegenpartij;wederpartij
祈ります	いのります	pray;prays	bidden;smeken;hopen;wensen
誰でも	だれでも	everybody;anybody;anyone;everyone;whoever	iedereen;wie dan ook;eender wie;om het even wie
違い	ちがい	difference	verschil
髪型	かみがた	hairstyle	kapsel
#177	public occasions	public occasions	Campus: Introduce a guest on campus	School: Stel een leraar voor
いらっしゃいます	=	available	zijn;komen;gaan;aanwezig zijn;verblijven
くださいます	=	give	geven;schenken;aanbieden;toesturen
ご存知	ごぞんじ	know	weten;kennen;op de hoogte zijn van;bekend zijn met;weten van
ご覧になります	ごらんになります	to see;to look;to watch;to view;to observe	bekijken;aanschouwen;zien;kijken
ぜいたく	=	luxury	luxe
なさいます	=	do;make;perform;carry out;undertake;greet;give a speech;make a speech;go on a business trip	doen;maken;verrichten;uitvoeren;houden
ふさわしい	=	proper;befitting;worthy;suitable;appropriate;fitting;eligible	passend;geschikt;gepast;waardig
パン屋さん		baker	bakker
前向き	まえむき	positive;optimistic	positief
声をかけます	こえをかけます	to call out;to speak to;to address;to contact;to approach;to greet;to start a conversation;to initiate conversation	aanspreken;roepen;begroeten;een praatje maken;contact opnemen;benaderen
学園祭	がくえんさい	school festival	schoolfestival
捕まえます	つかまえます	catch	
来学期	らいがっき	next semester	het volgende semester
立候補	りっこうほ	run	kandidatuur
結婚	けっこん	marriage;wedding;marriages	huwelijk;trouwen
貯金します	ちょきんします	save money;deposit money;put money aside;save up;put aside money;save earnings	
通訳	つうやく	interpreter	tolk
#178	customer service	customer service	Office: Help an office visitor	Service: Zoek samen een oplossing
お礼	おれい	thanks	dank
サポートします	=	support	ondersteunen;helpen;bijstaan;begeleiden;assisteren
バイト先	バイトさき	part-time job place	werkplek
優しく		gently	zacht
協力	きょうりょく	cooperation	samenwerking;medewerking;hulp;assistentie
孫	まご	grandchild	kleinkind
技術	ぎじゅつ	technology	technologie
暖房	だんぼう	heater	verwarming
最低	さいてい	at least	minstens
比べます	くらべます	compare;contrast;measure against;match	vergelijken;afzetten tegen;contrasteren
満足	まんぞく	satisfied	tevreden
箱	はこ	box	doos
素晴らしい	すばらしい	amazing;brilliant;excellent;fine;admirable;gorgeous;wonderful;great;cool;fabulous;nice;marvelous;fantastic;splendid;great—it's	fantastisch;uitstekend;schitterend;mooi;prima;geweldig;prachtig;voortreffelijke
練習	れんしゅう	practice	oefening
見た目	みため	appearance	uiterlijk
辞めます	やめます	quit	stoppen;opgeven;ontslag nemen;beëindigen;ophouden;verlaten
銀座	ぎんざ	Ginza	Ginza;wijk Ginza;winkelgebied Ginza;commerciële wijk Ginza
韓国語	かんこくご	Korean	Koreaans
#179	visual arts	visual arts	Exhibit: Describe artworks	Museum: Beschrijf een kunstwerk
えいきょう	=	influence	invloed
お花畑	おはなばたけ	flower field	bloemenveld
しーんとします	=	become silent;fall silent;be quiet;go quiet;hush;quiet down;become hushed	stil worden;zwijgen;verstommen;muisstil zijn;doodstil zijn;verstillen;bedaren
でお願いします		please;I would like;I request;please do it with;please use;with;using	alstublieft;graag;ik wil graag;graag met;alsjeblieft;met;in;alstublieft in deze vorm
タイトル	=	title	titel
ライティング	=	lighting	verlichting
効果	こうか	effect	effect
壁	かべ	wall	muur
本物	ほんもの	genuine	echt
森	もり	forest	bos
準備万端	じゅんびばんたん	ready	volledig klaar
荷物	にもつ	package	pakket
葉っぱ	はっぱ	leaf	blad
虹	にじ	rainbow	regenboog
見えない		do not see;cannot see;invisible	onzichtbaar;niet zichtbaar;onzichtbare;niet te zien
触ります	さわります	touch	aanraken;voelen;tasten
#180	public transit	public transit	Commute: Describe your commute	Station: Vertel over je reis naar het station
おす	=	male	mannetje
お皿	おさら	plate	bord
アプリ決済		app payment	app-betaling
エンタメ	=	entertainment	entertainment
バス停	バスてい	bus stop	bushalte
ラッシュ	=	rush hour	spits
ルート	=	route	route
上ります	のぼります	to go up;to climb;to ascend;to rise;to walk up	
乗り換えます	のりかえます	transfer;change;change trains;transfer trains;switch trains;switch;transfer vehicles;change buses	
十五番目		fifteenth	vijftiende
地下鉄	ちかてつ	subway	metro
大声で		loudly	
床	ゆか	floor	vloer
得意	とくい	specialty	vaardig;bekwaam;sterk;trots;favoriet;specialiteit;goed in;bedreven in
手続き	てつづき	procedure	procedure
手術を受けます	しゅじゅつをうけます	undergo surgery;have surgery;receive surgery;get surgery;have an operation;undergo an operation	
目が悪い	めがわるい	poor eyesight;bad vision;weak eyes;have poor eyesight;being visually impaired	
着陸	ちゃくりく	landing	landing
西口	にしぐち	west exit	westelijke uitgang
#181	library	library	Advice: Suggest where to go	Instructie: Geef een advies
こういう	=	this kind of;these kinds of	zulke;dit soort;dergelijke;zo'n;dit;deze
どうしたら	=	what should I do;how should I do;what to do;how to do;how can I;how do I;how to make;how to create	hoe kan ik
へとへと	=	exhausted	uitgeput
らいいですか	=	is it okay;is it alright;may I;can I;should I;what should I do;where should I go;when should I return;which one should I choose;how much should I drink	is het goed;mag ik;kan ik;wat moet ik;waar moet ik;wie moet ik;wanneer moet ik;welke moet ik
らどうですか	=	how about	hoe is het;wat vind je ervan;hoe gaat het;wat denk je ervan;wat als je;hoe zou het zijn als
カウンター席	カウンターせき	counter seat	toonbankplaats
両親	りょうしん	parents;my parents;folks	ouder
五番目		fifth	vijfde
先に	さきに	first	van tevoren
図書館	としょかん	library	bibliotheek
境界線	きょうかいせん	boundary line	grenslijn
復習します	ふくしゅうします	review;revise;go over;study again	
棚	たな	shelf	plank
正式	せいしき	formal	officieel
美術館	びじゅつかん	art museum	museum
蒸し暑い	むしあつい	humid	benauwd;drukkend;vochtig warm;klam;benauwd warm
解きます	ときます	resolve;untie	oplossen;ontleden;verklaren;losmaken;ontknopen
面接	めんせつ	an interview;interviews;the interview	
#182	everyday tech	everyday tech	Events: Share festival memories	Techniek: Vraag naar festivalgadgets
お祝い	おいわい	celebration	feest
と関係があります		is related to;has a relationship with;is connected to;is associated with;is linked to;has to do with	te maken hebben met;verband houden met;gerelateerd zijn aan;in verband staan met;betrekking hebben op
ぶんせき	=	analysis	analyse
イヤホン	=	earphone	oordopjes;koptelefoon;hoofdtelefoon
ネット	=	internet	net
バッテリー	=	battery	batterij
公開します	こうかいします	publish;release;make public;disclose;unveil;share	openbaar maken;publiceren;vrijgeven;uitbrengen;tonen;laten zien
再起動します	さいきどうします	restart;reboot;restarting;rebooting	
割れます	われます	break;crack;split;shatter;burst	breken;barsten;scheuren
卒業します	そつぎょうします	will graduate from;am graduating from	
港	みなと	port	haven
突然	とつぜん	sudden	plotseling
綿	めん	cotton	katoen
花火大会	はなびたいかい	fireworks festival	vuurwerkfestival
計算します	けいさんします	calculate;compute;count;estimate;reckon;figure out;work out	berekenen;rekenen;uitrekenen;calculeren
間に		while	tijdens;tussen;daartussen
#183	job interview	job interview	Work Life: Talk about your job experience	Werkplek: Vertel over je werkplek
おります	=	we are;will get off;getting off;gets off;I am;will disembark;disembarks;going to get off	zijn;zitten;staan;zich bevinden;afstappen;uitstappen;neerzetten;neerleggen;dalen;hebben;bereiden;kennen;weten;leven;voortzetten
お目にかかります	おめにかかります	to meet;to see;to have the honor of meeting	ontmoeten;spreken
会議室	かいぎしつ	conference room	vergaderruimte
伺います	うかがいます	visit;ask	vragen;informeren;bezoeken;komen;langskomen
判断します	はんだんします	judge;decide;determine;assess;evaluate;make a judgment;make a decision	oordelen;beoordelen;beslissen;bepalen;evalueren;besluiten
十二番目		twelfth	twaalfde
子供のころ		childhood	kindertijd
存じます	ぞんじます	know;think;believe;consider;regard	weten;kennen;denken;geloven;begrijpen;achten;vinden
拝見します	はいけんします	will take a look at	bekijken;zien;lezen
整えます	ととのえます	sets	ordenen;regelen;voorbereiden;aanpassen;in orde maken;netjes maken
注意	ちゅうい	his attention;my attention;her attention;caution;your attention;precautions	opletten;opgelet
無職	むしょく	unemployed	werkloos
申し上げます	もうしあげます	would like to express	zeggen;meedelen;uitdrukken;aanbieden;verklaren;melden;vertellen;rapporteren;presenteren
約束	やくそく	the promises;the promise;his promise;a promise;his word;deals;my word;appointment;word;appointments;deal;your promises	afspraak;belofte;toezegging;verbintenis;verloving;beloften
細かい	こまかい	fine;finer	fijn;gedetailleerd;nauwkeurig;klein;precies;uitvoerig
給料	きゅうりょう	salary	salaris
自己紹介します	じこしょうかいします	I'll introduce myself	mezelf voorstellen;zich voorstellen;mezelf introduceren
辞職します	じしょくします	resign;quit;step down;leave office;retire	ontslag nemen;aftreden;terugtreden
#184	cultural practices	cultural practices	Permission: Ask for permission	Evenement: Leg het evenement uit
いただけませんか	=	would please ... for me;could you please;would you mind ... for me;would please ... for us;would you mind ... for us;could	zou u kunnen geven;kunt u geven;mag ik krijgen;zou ik kunnen krijgen;kunt u me geven;zou u kunnen bevestigen;kunt u bevestigen;zou u kunnen uitleggen;kunt u uitleggen;zou u kunnen voorbereiden;kunt u voorbereiden;zou u kunnen informeren;kunt u informeren;zou u kunnen meedelen;kunt u meedelen;zou u kunnen bespreken;kunt u bespreken;zou u kunnen vertellen;kunt u vertellen
でしょうか	=	would it be	zou het zijn;zou het kunnen zijn;is het misschien;zou het mogelijk zijn;zou het kunnen;is;zou zijn
コツ	=	tip	tip
タバコを吸います	タバコをすいます	smoke tobacco;smoke a cigarette;do you smoke;does he smoke;does she smoke;do they smoke;to smoke tobacco	roken
分かりやすい	わかりやすい	easy to understand;clear;simple;straightforward;comprehensible;easy;user-friendly;accessible	
印象	いんしょう	impression	indruk
差し上げます	さしあげます	give;offer;present;provide;send	geven;aanbieden;schenken;toesturen;overhandigen
政府	せいふ	government	regering
日陰	ひかげ	shade	schaduw
正直に		honestly	eerlijk
汚れ	よごれ	stain	vuil
真面目	まじめ	serious	serieus
紙袋	かみぶくろ	paper bag	papieren zak
経験	けいけん	experience;experiences	ervaring;belevenis;ondervinding;kennis;deskundigheid
行事	ぎょうじ	event	evenement
門	と	gate	poort
静かに	しずかに	quietly	stil
#185	restaurant experiences	restaurant experiences	Restaurant: Choose a restaurant	Winkel: Beschrijf het winkelgebied
お腹	おなか	stomach	buik
ていねい	=	polite;careful;courteous;respectful;thorough;clear;detailed	beleefd;zorgvuldig;netjes;attent;nauwkeurig
よろしくお願いします	よろしくおねがいします	nice to meet you;I'm pleased to meet you	bedankt;alstublieft;ik reken op u;graag gedaan;ik waardeer het;ik hoop op uw steun;ik reken op uw hulp
不機嫌	ふきげん	grumpy	chagrijnig
今学期		current semester	huidig semester
売り切れます	うりきれます	sell out;be sold out;run out;be sold out quickly;run out of stock;be out of stock	
容量	ようりょう	capacity	capaciteit;inhoud;volume
店内	てんない	inside the store	in de winkel
指輪	ゆびわ	ring	ring
日差し	ひざし	sunlight	zonneschijn
残っています		remain;be left;be remaining;be left over;stay;be left undone;remain unfinished	overblijven;achterblijven;resteren;blijven liggen
混んでいます		busy;crowded	
生き物	いきもの	living creature	wezen
看板	かんばん	sign	reclamebord
行ってみます		try going;will try to go;try to go;attempt to go;visit;go and see	proberen te gaan;eens gaan kijken;proberen te bezoeken;bezoeken
駅前	えきまえ	in front of the station	stationplein
#186	self-expression	self-expression	Summer: Share summer goals	Vakantie: Vertel over je vakantieplannen
きれいに	=	neatly	netjes
この辺り	このあたり	this area	deze omgeving
せめて	=	at least	tenminste
つもり	=	intention	van plan zijn
危機	きき	crisis	crisis
夏休み	なつやすみ	summer vacation	zomervakantie
岸	きし	shore	oever
弱い	よわい	weak;sensitive;delicate	zwak;kwetsbaar;licht
旅行します	りょこうします	take a trip;travel;travels	
明け方	あけがた	dawn	ochtendgloren
正面	しょうめん	front	voorkant
燃やすゴミ	もやすごみ	burnable garbage	brandbaar afval
直します	なおします	fix;repair;correct;amend;revise;adjust;mend	
絹	きぬ	silk	zijde
記事	きじ	article	artikel
誕生	たんじょう	birth	geboorte
距離	きょり	distance	afstand
#187	film	film	Everyday Life: Ask about local places	Film: Vraag naar openingstijden
くだらない	=	worthless;trivial;silly;insignificant;stupid;pointless;nonsense;boring	
なんとか	=	somehow	
はず	=	should be	moeten
俳優	はいゆう	actor	acteur
前は		before	vroeger
収集	しゅうしゅう	collection	inzameling
実際の		actual	werkelijk
影	かげ	shadow	schaduw
思います	おもいます	believe;think;thinks;believes	
枝	えだ	branch	tak
柔らかい	やわらかい	soft;tender	zacht;soepel;mals;week
汚染	おせん	pollution	vervuiling
結末	けつまつ	ending	einde
裁判所	さいばんしょ	court	gerechtshof
誰にでも	だれにでも	anyone	iedereen
貿易	ぼうえき	trade	handel
農業	のうぎょう	agriculture	landbouw
長さ	ながさ	length	lengte;maat;omvang
養子	ようし	adopted child	
#188	geography	geography	Impressions: Share your first impressions	Taken: Leg een route uit
かわいそう	=	pathetic	zielig;medelijdenwekkend;triest;sneu
がけ	=	cliff	klif
へ	=	to;for	naar;heen
グラフ	=	graph	grafiek
メーカー	=	maker	koffiemaker
ユーザー	=	user	gebruiker
可能性	かのうせい	possibility	mogelijkheid
基本的	きほんてき	basic	basis
塗ります	ぬります	paint;paints	
大陸	たいりく	continent	continent
引っ張ります	ひっぱります	pull;draw;tug;drag;stretch;move	trekken;slepen;trekken aan;vasthouden;verplaatsen
文章	ぶんしょう	text	tekst
書類	しょるい	document	document
最優先	さいゆうせん	top priority	hoogste prioriteit
最初	さいしょ	first	eerste
海岸	かいがん	coast	kust
湾	わん	bay	baai
近く	ちかく	nearby	buurt
鉄	てつ	iron	ijzer
#189	future plans 2	future plans 2	Hanukkah: Share how you prepare	School: Bespreek de schoolwedstrijd
お守り	おまもり	amulet	amulet
じゅんすい	=	pure;genuine;unmixed;simple;innocent;authentic	zuiver;puur;ongerept;onbevlekt;onvermengd
そのあと	=	after that	daarna
といいですね	=	I hope;It would be nice if;Hopefully;It would be good if;I wish;It would be great if;It would be nice to;It would be good to	het zou fijn zijn;hopelijk;ik hoop dat;zou goed zijn als;het zou mooi zijn als;het zou goed zijn;het zou fijn zijn als
セール品		sale item	aanbiedingsartikel
ハヌカ	=	Hanukkah	Chanoeka
割	わり	broken	tiensten
履歴書	りれきしょ	resume	cv
待ちきれない	まちきれない	.. can't wait	ongeduldig zijn;niet kunnen wachten;uitkijken naar;verlangen naar
忘れずに		without forgetting	zonder te vergeten
月	つき	moon	maan
条件	じょうけん	condition	voorwaarde
物価	ぶっか	cost of living	levensonderhoudskosten
管理	かんり	management	beheer
落ち込んでいます		to be depressed;to be down;to be discouraged;to be disheartened;to be in low spirits;to feel sad;to feel upset	zich neerslachtig voelen;zich down voelen;zich verdrietig voelen;zich somber voelen;zich gedeprimeerd voelen;teleurgesteld zijn;ontmoedigd zijn;zich laten ontmoedigen
試験	しけん	exam	examen
賞	しょう	award	prijs
赤ちゃん	あかちゃん	baby	baby
飛びます	とびます	fly;flown	
#190	scientific discoveries	scientific discoveries	Science: Talk about science news	Wetenschap: Praat over nieuw onderzoek
そういう	=	those kinds of	zo'n;dergelijk;zulk;zulke;dat soort
とか	=	things like;something like	of;zoals;bijvoorbeeld;en zo;enzovoort;en
の代わりに		instead of	in plaats van
わくわくします	=	be excited;look forward to;be thrilled;be eager;be delighted;anticipate	opgewonden zijn;enthousiast zijn;uitkijken naar;blij zijn;verheugd zijn;anticiperen
ロボット	=	robot	robot
世界中	せかいじゅう	worldwide	over de hele wereld
便	びん	flight	vlucht
失礼します	しつれいします	pardon me;excuse me;I will be leaving	excuseer me;pardon;sorry;mag ik binnenkomen;neem me niet kwalijk
心理学	しんりがく	psychology	psychologie
恐怖	きょうふ	fear	angst
想像力	そうぞうりょく	imagination	verbeeldingskracht
意見	いけん	opinion	mening
才能があります		is talented	talent hebben;aanleg hebben voor;bekwaam zijn;vaardig zijn
植物	しょくぶつ	plant	plant
煙	けむり	smoke	rook
賢い	かしこい	smart;sharp;intelligent;wise;clever	verstandig;slim;wijs;intelligent;knap;scherpzinnig;handig
重要	じゅうよう	important	belangrijk
金色	きんいろ	golden	goudkleurig
#191	buying goods	buying goods	Shopping: Ask about prices	Aankopen: Vraag naar wat je nodig hebt
お願いします	おねがいします	please give;I would like	
だけじゃなくて	=	not only but also	niet alleen maar
どうしますか	=	What will you do;What should I do;What do you want to do;How will you handle it;What are you going to do;What do you want to do about it;How do you want to proceed	
にいい	=	good for;beneficial to;suitable for;favorable to;advantageous to	
マナーモード	=	silent mode	stille modus
モデル	=	model	model
修理の人		technician	monteur
切符	きっぷ	ticket	kaartje
十個		ten	tien
嬉しい	うれしい	happy;it is a pleasure;glad	blij;gelukkig;verheugd;tevreden;vrolijk
専門家	せんもんか	expert	expert
布団	ふとん	futon	futon
日用品	にちようひん	household good	dagelijkse benodigdheden
気に入ります	きにいります	would like;will like;like	
褒めます	ほめます	praise;compliment;admire;commend;applaud;appreciate	
輝きます	かがやきます	shine;sparkle;glitter;radiate;gleam;glow	
長持ち	ながもち	last	lang meegaan
#192	environmental features	environmental features	Community: Describe your community	Seizoen: Vertel over de natuur
うちに	=	while;with us;at home	terwijl;binnen;tijdens;in de loop van;voordat;zolang;zolang als
プライベート	=	private	privé
人形	にんぎょう	doll	pop
協会	きょうかい	association	vereniging
土台	どだい	foundation	onderstel
埋めます	うめます	bury;fill;cover;plug;fill in;fill up	begraven;ingraven
平ら	たいら	flat	vlak
成功します	せいこうします	succeeds	
拾います	ひろいます	pick up;gather;collect;find;retrieve	
曇ります	くもります	to become cloudy;to cloud over;to get cloudy;to be overcast	bewolken;dichttrekken;bewolkt zijn
汚れます	よごれます	get dirty;become dirty;stain;soil;become soiled;get stained	vuil worden;vies worden
登ります	のぼります	goes up;climbs	
緑	みどり	greenery;green	groen
耳の不自由	みみのふじゆう	hearing impaired	gehoorprobleem
返品	へんぴん	return	retour
鼻水が出ます		runny nose;nasal discharge;have a runny nose;nasal drip;runny nose comes out	neus loopt;lopen;loopneus
#193	religion	religion	Plans: Make plans with friends	Traditie: Vertel over tradities
お寺	おてら	temple	tempel
お菓子屋	おかしや	pastry shop	banketbakkerij
ことにします	=	decide to;choose to;make up one's mind to;resolve to;plan to;intend to	besluiten;beslissen;bepalen;kiezen;besluiten om;beslissen om
それぞれ	=	each	elk
マイノリティ	=	minority	minderheid
今まで	いままで	until now	tot nu toe
宗教	しゅうきょう	religion	religie
手作り	てづくり	handmade	handgemaakt
改札	かいさつ	ticket gate	kaartcontrole
教会	きょうかい	church	kerk
満足している		satisfied	tevreden
空港	くうこう	airport	luchthaven
考えが変わる		change one's mind;change one's thinking;have a change of heart;alter one's opinion;shift one's perspective;reconsider one's views;have a change in thinking	van gedachten veranderen;van mening veranderen;van idee veranderen;van inzicht veranderen;van opvatting veranderen;van standpunt veranderen
考え方	かんがえかた	way of thinking	manier van denken
設備	せつび	facility	voorziening
認めます	みとめます	recognize;admit;acknowledge;approve;accept;allow	erkennen;toestaan;accepteren;goedkeuren;vaststellen;onderkennen
足りない	たりない	could use;is missing;am short on;lacks	onvoldoende;niet genoeg;tekort;missen
#194	recycling and waste	recycling and waste	Recycling: Talk about recycling at home	Voorbeeld: Praat over recycling
なので	=	so	omdat
よね	=	won't he;is he;was he;does he;won't she;isn't he;will she;will there;can't he;can he;will it;won't you;could he;won't there;wasn't he;doesn't he;didn't he;shouldn't he;right;is it;is she;shouldn't she;are you;don't they;were you;didn't you;can't we;aren't they;was she;wasn't she;isn't she;weren't you;could she;was it;didn't she;could you;can they;wasn't it;shouldn't we;can you;weren't they;didn't they;aren't you;was there;are they;were they;doesn't she;can't she;aren't there;shouldn't I;isn't there;can't I;didn't it;didn't we;doesn't it;isn't it;will he	hè;toch;nietwaar;hè hè;hè nou;toch wel;zeker
ダメ	=	not allowed	niet toegestaan
リサイクルボックス	=	recycling box	recyclebak
例	れい	example	voorbeeld
全然	ぜんぜん	completely;not at all	helemaal;volstrekt;totaal;helemaal niet;volkomen
刺し身	さしみ	sashimi	sashimi
古着	ふるぎ	used clothes	tweedehandskleding
州	しゅう	state	staat
手袋	てぶくろ	glove	handschoen
散歩します	さんぽします	goes for a walk;go on walks;take walks;takes a walk	wandelen;een wandeling maken;lopen;slenteren;kuieren;flaneren
用意します	よういします	prepare;arrange;get ready;make preparations;provide	voorbereiden;klaarmaken;regelen;gereedmaken;verzamelen
発表	はっぴょう	presentation;announcement	aankondiging;presentatie;bekendmaking;mededeling;publicatie
繋がります	つながります	connect;link;be related;be tied;be connected;lead to;result in;be connected to	verbinden;aansluiten;koppelen;samenhangen;contact maken;leiden tot
謝罪	しゃざい	apology;apologize;apology statement;apology letter;expression of regret;act of apologizing;apology to;apologize to	verontschuldiging;excuses;schuldbekentenis;zich verontschuldigen;zich verontschuldigen bij;excuses aanbieden;een excuus aanbieden aan
賛成	さんせい	agreement	instemming
跡	あと	mark	spoor
#195	digital tools	digital tools	Settings: Change the lighting	Vrienden: Leg iets uit aan je vrienden
usbメモリー		USB flash drive	usb-stick
って	=	casual topic marker;that	dat;zei;noemde;over;als;wat;is;horen;zeggen
と比べて	とくらべて	compared to;compared with;in comparison to;in comparison with;relative to;versus	vergeleken met;in vergelijking met;ten opzichte van
どこからでも	=	from anywhere	vanuit overal
スイッチ	=	switch	schakelaar
メモ	=	memo	notitie
他の場所		other place	andere plek
友情	ゆうじょう	friendship	vriendschap
手を貸します	てをかします	help;assist;lend a hand;give a hand;offer help	helpen;assisteren;bijstaan;ondersteunen;bijspringen
旅館	りょかん	ryokan	ryokan
有罪	ゆうざい	guilty	schuldig
橋	はし	bridge	brug
涼しい	すずしい	cool	koel;fris;aangenaam koel;verfrissend
番号	ばんごう	number	nummer
設定	せってい	setting	instelling
電球	でんきゅう	light bulb	gloeilamp
#196	gardening	gardening	Garden: Invite friends to join	Tuin: Bespreek tuinplannen
つづけます	=	continue;keep;carry on;proceed;persist;keep on;continue to do	voortzetten;doorgaan;blijven;aanhouden;vervolgen;doorgaan met;blijven doen
ハーブ	=	herb	kruid
会場	かいじょう	venue	locatie
傷つけます	きずつけます	hurt;injure;wound;damage;offend	kwetsen;verwonden;beschadigen;pijn doen
初心者	しょしんしゃ	beginner	beginner
咲きます	さきます	bloom	
土	つち	soil	grond
止まります	とまります	stop	
水をやります	みずをやります	water the plants;give water;provide water;water	water geven;bewateren;besproeien;gieten
神社	じんじゃ	shrine	schrijn
肌	はだ	skin	huid
覚えています		remember;recall;memorize;learn;recognize	herinneren;onthouden;weten;zich herinneren
言葉にします		put into words;express;verbalize;articulate;convey;say	in woorden uitdrukken;verwoorden;onder woorden brengen;uitdrukken;formuleren
軽く		gently	licht
隣の		next-door	naastgelegen
#197	weddings	weddings	Weddings: Plan wedding details	Bruiloft: Bespreek de bruiloftsplannen
ことです	=	thing;matter;fact;event;occurrence;point;reason;cause;nominalizer;concept;idea;act;action	zaak;ding;kwestie;feit;gebeurtenis;rol
つまり	=	in other words	met andere woorden
ということです	=	that means	dat wil zeggen dat
スタイリスト	=	stylist	stylist
口座	こうざ	account	rekening
夫婦	ふうふ	married couple	echtpaar
建物	たてもの	building	gebouw
心から	こころから	heartfelt	oprecht
掃除機	そうじき	vacuum cleaner	stofzuiger
歴史	れきし	history	geschiedenis
番組	ばんぐみ	program	programma
発見します	はっけんします	discovers	
祝います	いわいます	celebrate;congratulate;bless;wish well;offer congratulations	
絆	きずな	bond	band
結婚式	けっこんしき	wedding ceremony	bruiloft
複雑	ふくざつ	complex	complex
費用	ひよう	cost	kosten
迎えに行きます	むかえにいきます	picking ~ up	
#198	travel experiences	travel experiences	Places: Talk about places you visited	Bezoek: Vertel over je reiservaringen
ご家族		family	familie
のんびり	=	relaxedly	
ローマ	=	Rome;roman	
予想できない		unpredictable;unforeseeable;unexpected;unimaginable;incalculable;uncertain	
会話	かいわ	conversation	gesprek
動物	どうぶつ	animal	dier
名刺	めいし	business card	visitekaartje
地元の人		local person;local people;local resident;local inhabitants;locals;people from the area	lokale mensen
寂しい	さびしい	isolating;lonely	eenzaam;verlaten;stil;leeg;triest;gemis
布	ぬの	fabric	stof
政治的	せいじてき	political	politiek
暗い	くらい	dark;it's dark	donker;duister;somber;schemerig
決まります	きまります	decide;be decided;be settled;be fixed;be determined;become established	
海外旅行	かいがいりょこう	overseas travel	buitenlandse reis
目的	もくてき	purpose	doel
辺り	あたり	area	omgeving
雨が多い	あめがおおい	rainy;a lot of rain;heavy rainfall;frequent rain;it rains a lot;many rainy days	
#199	getting a haircut / salon	getting a haircut / salon	Salon: Ask about a new look	Kapsels: Beschrijf je kapsel
あこがれの人		admired person	idool
いい感じ	いいかんじ	good	goed uitzien
ご	=	polite;five	eer
しっぽ	=	tail	staart
じょうだん	=	joke	grap
すごいと思います		I think it's amazing;I think it's great;I think it's awesome;I think it's incredible;I think it's impressive;I think it's excellent;I think it's outstanding	geweldig;fantastisch;indrukwekkend;geweldig vinden;indrukwekkend vinden;verbazingwekkend
任せます	まかせます	will leave ... to	
偶然	ぐうぜん	accidentally	toevallig
八番目		eighth	achtste
商業	しょうぎょう	commerce	handel
四分の一		one fourth	vierde
大切にします		cherish;value;take good care of;treasure;hold dear;take care of	koesteren;waarderen;zorgvuldig behandelen;belangrijk vinden;respecteren;verzorgen;respectvol behandelen
格好	かっこう	appearance	uiterlijk
真ん中	まんなか	middle	midden
美容室	びようしつ	beauty salon	kapsalon
隠れた		hidden	verborgen
風邪を引きます	かぜをひきます	catch a cold;come down with a cold;get a cold	verkouden worden;een verkoudheid krijgen;griep oplopen;een verkoudheid oplopen
髪	かみ	hair	haar
#200	gift giving	gift giving	Gifts: Pick a gift	Feest: Kies een cadeau uit
こんな	=	these;this kind of;like this;such;these kinds of	zo'n;dergelijke;zulke;dit soort;zulk
だいたい	=	about	ongeveer
ですか	=	isn't it?;is;is it;is that;is she;is he;are;are they;are we;are you;are there;will you;does she;does it;do you;does he;would you;does;am I;going to be	is;bent;zijn;is het;nietwaar
ままです	=	remain	blijven
エコバッグ	=	eco bag	herbruikbare tas
三本	さんぼん	three	drie stuks
値段	ねだん	price	prijs
受け取ります	うけとります	receives	
息子	むすこ	son	zoon
悩み	なやみ	worry	zorg
支えます	ささえます	support;supports	ondersteunen;steunen;dragen;helpen;bijstaan
新婦	しんぷ	bride	bruid
注文	ちゅうもん	order	bestelling
派手	はで	flashy	flitsend
笑顔	えがお	smile	glimlach
表	おもて	front	voorzijde
誕生日パーティー	たんじょうびパーティー	birthday party	verjaardagsfeest
転職します	てんしょくします	change jobs;change careers;switch jobs;find a new job;join a new company	van baan veranderen;van werk veranderen;van carrière veranderen;een andere baan nemen;van beroep veranderen;van werkgever veranderen
高級	こうきゅう	luxurious	luxe
#201	geopolitical issues	geopolitical issues	News: Share local news	Stad: Vraag naar aankomsttijden
しょうこ	=	evidence	bewijs
らしい	=	apparently;supposed to;appear;I hear that;it appears that;it seems that;supposedly;appears	typisch;blijkbaar;naar verluidt;schijnbaar;kennelijk;het schijnt;het lijkt erop
三泊		three-night	drie nachten
予約	よやく	reservation	reservering
到着	とうちゃく	arrival	aankomst
力を入れます	ちからをいれます	put effort;exert effort;focus;concentrate;make an effort;dedicate;put energy into	inspannen;moeite doen;zich inzetten;kracht zetten;energie steken in;focussen op;prioriteit geven aan
囲みます	かこみます	surround;enclose;encircle;fence in;enclose with a fence;gather around;sit around	omringen;omsluiten;insluiten;omheinen;omcirkelen
国際ニュース		international news	internationaal nieuws
奥さん	おくさん	wife	echtgenote;vrouw;mevrouw;partner
安定	あんてい	stability	stabiliteit
後についていきます		follow after;follow behind;come after;follow along;follow everyone;follow	volgen;achtervolgen;meegaan met;achter iemand aan gaan;achter iemand aan lopen
水族館	すいぞくかん	aquarium	aquarium
用事	ようじ	task	zaak
記者	きしゃ	reporter	journalist
近いうちに	ちかいうちに	soon	binnenkort
食パン	しょくパン	white bread	witbrood
首都	しゅと	capital city	hoofdstad
#202	types of cuisine	types of cuisine	Restaurants: Share your favorite dishes	Favorieten: Vertel over je favoriete eten
なら	=	it'd;you're;for;you'd;if;we'd	Als;als
デカい	=	big;huge;gigantic;enormous;massive;large	groot;enorm;reusachtig;gigantisch;kolossaal
パン屋	パンや	bakery	bakkerij
ラザニア	=	lasagna	lasagne
個	こ	piece	stuk
好み	このみ	preference	voorkeur
寿司	すし	sushi	sushi
心	こころ	heart	hart
快速	かいそく	rapid train	sneltrein
機会	きかい	opportunity	kans
焼き鳥	やきとり	yakitori	yakitori
硬い	かたい	tight;hard;firm	hard;stevig;stug;taai;streng
舌	した	tongue	tong
踊ります	おどります	dance;dances	
選手	せんしゅ	player	speler
食べ放題	たべほうだい	all-you-can-eat	all-you-can-eat
#203	fashion	fashion	Fashion: Describe your outfit	Mode: Vertel over je kledingkeuze
くせ毛	くせげ	curly hair	krullend haar
ばかり	=	just;only;continuously	net;ongeveer;slechts;alleen maar;pas;zojuist
オフィスカジュアル	=	office casual	office casual
コレクション	=	collection	collectie
シャツ	=	shirt	shirt
シーズン	=	season	seizoen
並びます	ならびます	will wait in line	in de rij staan;op een rij staan;zich opstellen;zich scharen;zich rangschikken;wachten in de rij;aanschuiven
効きます	ききます	works	werken;effect hebben;helpen;doeltreffend zijn;invloed hebben;aanslaan;effect sorteren
履きます	はきます	wears;wear;will put on	
投げます	なげます	throw;toss;pitch;cast;hurl	gooien;werpen;smijten
方法	ほうほう	method	methode
最大限	さいだいげん	as much as possible	maximaal
毎	まい	every;each;per	elke
簡単に		easily	gemakkelijk
素敵	すてき	lovely	prachtig
試着室	しちゃくしつ	fitting room	paskamer
誌	し	magazine	tijdschrift
重さを量ります		measure weight;weigh;take the weight of	het gewicht meten;wegen;het gewicht bepalen
#204	first aid	first aid	Experience: Share past experiences	Ervaring: Vertel over een nieuwe ervaring
けが	=	injury	verwonding
さえ	=	even	zelfs;alleen;zelfs maar;zelfs niet;zelfs als;mits;zolang;als
その間	そのあいだ	meanwhile	ondertussen
ちらっと見ます	ちらっとみます	glance;peek;glimpse;take a quick look;check;look briefly	vluchtig kijken;even kijken;kort kijken;snel kijken;gluren
会議	かいぎ	meeting	vergadering
割合	わりあい	proportion	percentage
周りの人		people around	mensen om me heen
失敗	しっぱい	failure	mislukking
彼女	かのじょ	my girlfriend	mijn vriendin
擦り傷	すりきず	scrape	schram
救急車	きゅうきゅうしゃ	ambulance	ziekenwagen
有能	ゆうのう	competent	bekwaam
温泉	おんせん	hot spring	onsen
研修	けんしゅう	training	training
種	たね	seed	zaad
観光	かんこう	sightseeing;tourism	toeristisch;toerisme
防災	ぼうさい	disaster preparedness	rampenpreventie
集まり	あつまり	meeting	bijeenkomst
#205	destinations	destinations	Resorts: Share opinions about resorts	Uitstap: Bespreek weekendafspraken
お願いしました		request	verzocht
ほっとした	=	relieved	opgelucht
インフォメーション	=	information desk	informatiepunt
サウナ	=	sauna	sauna
トレンド	=	trend	trend
両方	りょうほう	both	beide
六個		six	zes
商店街	しょうてんがい	shopping arcade	winkelstraat
宿題	しゅくだい	homework	huiswerk
池	いけ	pond	vijver
沖縄	おきなわ	Okinawa	
浮きます	うきます	float;rise;drift;be buoyant;bob;stand out;feel out of place	
珍しい	めずらしい	rare;unusual;atypical	zeldzame;ongewoon;zeldzaam;bijzonder;ongebruikelijke
砂まみれ		sand-covered	bedekt met zand
自由に	じゆうに	freely	vrij
連れて行きます	つれていきます	take;are taking	meenemen;begeleiden;brengen
階段	かいだん	stairs	trap
#206	family structure	family structure	Family: Describe your family members	Wijk: Vertel over je wijk
おかげで	=	thanks to	dankzij
お祭り	おまつり	festival	festival
けっきょく	=	in the end	uiteindelijk
はっきりと	=	clearly	duidelijk
コミュニティ	=	community	gemeenschap
ノックします	=	knock;knock on;knock at;tap;rap	kloppen;aankloppen;bonzen
レイアウト	=	layout	lay-out
入院	にゅういん	hospitalization	opname
女優	じょゆう	actress	actrice
家族会議	かぞくかいぎ	family meeting	familievergadering
知事	ちじ	governor	gouverneur
郊外	こうがい	suburb	voorstad
離婚した		divorced	gescheiden
頼りになります	たよりになります	reliable;dependable;trustworthy;helpful;supportive;to rely on	betrouwbaar zijn;steun zijn;hulp zijn;een steun zijn
#207	philosophy	philosophy	Topics: Ask about the neighbors	Situatie: Vertel over je buren
じまん	=	proud	trots
てつがく	=	philosophy	filosofie
どこにも	=	nowhere	nergens
どこも	=	nowhere	nergens
ワンチャンあります	=	there's a chance;there's a possibility;might happen;could be;maybe;there's still hope	er is een kans;er is een mogelijkheid;misschien;kans hebben;er is een kleine kans
丸	まる	circle	cirkel
住所	じゅうしょ	address	adres
全く	まったく	completely	helemaal niet
受け入れられます		be accepted;be admitted;be received;be embraced;be approved;be agreed upon	accepteren;aanvaarden;goedkeuren
強引に		forcefully	met geweld;dwingend;opdringerig;met kracht;onverbiddelijk;resoluut
忘れられない	わすれられない	unforgettable	onvergetelijk;niet te vergeten;onuitwisbaar;blijvend
最悪	さいあく	the worst	het ergste
正解	せいかい	correct answer	juiste antwoord
経済	けいざい	economy	economie
能力	のうりょく	ability	vermogen
誰にも	だれにも	to anyone;to anybody	niemand
誰も	だれも	none;nobody;no one;anybody;anyone;none of us	niemand
#208	sports 2	sports 2	Competition: Ask about injuries	Toernooi: Praat over je teamgenoten
あきらめます	=	give up;abandon;resign;relinquish;quit;surrender	opgeven;afzien;afstand doen;berusten;loslaten
ほど	=	sufficient;enough;about;as ... as;extent	ongeveer;circa;zo veel als;mate;omvang;graad;niveau;naarmate;hoe...des te
ゴール	=	goal	doel
プレッシャー	=	pressure	druk
マラソン大会	マラソンたいかい	marathon	marathonwedstrijd
体力	たいりょく	physical strength	uithoudingsvermogen
勝負します	しょうぶします	to compete;to match;to have a contest;to play a game;to gamble;to challenge	wedden;strijden;concurreren;spelen;vechten;uitdagen
商品	しょうひん	product	product
定食	ていしょく	set meal	setmaaltijd;menu;vaste schotel;maaltijdcombinatie;maaltijd;schotel
年齢	ねんれい	age	leeftijd
戦い	たたかい	battle	gevecht
打ちます	うちます	hit;strike;beat;play;type;shoot;knock;punch;serve	slaan;tikken;schieten;slaan op;raken;kloppen;slaan met;slaan tegen;spelen
消します	けします	switch off;disappears	wissen;uitwissen;verwijderen;uitdoen;doven;uitschakelen
深さ	ふかさ	depth	diepte
緊急事態	きんきゅうじたい	emergency	noodgeval
腕	うで	arm	arm
袋	ふくろ	bag	zak
進めます	すすめます	advance;proceed;promote;move forward;carry on;push ahead;prepare	voortzetten;bevorderen;vooruitgaan;aanbevelen;versnellen;voorbereiden
#209	public policy	public policy	Writers: Talk about library hours	Stad: Deel je mening over verkeer
だから	=	therefore	dus
ほります	=	carve;engrave;dig;etch;chisel;dig out	
わけ	=	reason	reden;oorzaak;betekenis;bedoeling;gevolg;verklaring;conclusie
中国語	ちゅうごくご	Chinese	Chinees
作家	さっか	writers;writer;author;authors	schrijver;auteur;romanschrijver;dichter
全ての		all;every;everything's	alle;elk;iedere
動きやすい		easy to move;mobile;flexible;agile;maneuverable;comfortable;easy to wear	
十億	じゅうおく	billion	miljard
十泊		ten nights	tien nacht
反対します	はんたいします	disagree	
市内	しない	in the city	binnen de stad
最高	さいこう	best	beste
期待します	きたいします	expect;anticipate;look forward to;hope for;count on;hope	
法律	ほうりつ	law	wet
謎	なぞ	mystery	raadsel
面倒	めんどう	troublesome	lastig
#210	exercise routines	exercise routines	Levels: Enjoy fun stories	Beweging: Vertel over je sportschema
そのかわり	=	instead	in plaats daarvan
わけじゃない	=	it's not that	het is niet zo dat
レベル	=	level	niveau
保護者	ほごしゃ	guardian	voogd
優しい	やさしい	kind;nice;friendly	vriendelijk;zachtaardig;lief;aardig;zacht;zorgzaam;sympathiek
助ける	たすける	helps;aids;save;help;aiding;didn't	helpen;vooruitgeholpen
十三番目		thirteenth	dertiende
才能	さいのう	talent	talent
汗	あせ	sweat	zweet
汗をかきます	あせをかきます	sweat;perspire;work up a sweat;break out in a sweat;get sweaty;sweat a lot	
滑ります	すべります	slip;slide;skid;glide;slip up;be slippery	
膝	ひざ	knee	knie
転びます	ころびます	falls down	
電気屋	でんきや	electronics store	elektronicawinkel
#211	concerts and performances	concerts and performances	Events: Decide which event to attend	Evenement: Kies een evenement uit
かどうか	=	whether or not	of
オーケストラ	=	orchestra	orkest
チェックします	=	check	
パンフレット	=	brochure	brochure
十九番目		nineteenth	negentiende
周り	まわり	surroundings	omgeving
地域	ちいき	community;part;regions;area;neighborhood;district;region;neighborhoods	regionaal
文化的	ぶんかてき	cultural	cultureel
曲	きょく	song	stuk
歌手	かしゅ	singer	zanger
発見	はっけん	discovery	ontdekking
礼儀正しく		polite	beleefd
背景	はいけい	background	achtergrond
腕時計	うでどけい	wristwatch	polshorloge
開始時間		start time	begintijd
#212	historical events	historical events	Exhibit: Describe an exhibit	Stad: Vertel over een stad
あの時		at that time	die tijd
だんだん	=	gradually	geleidelijk;beetje bij beetje;langzamerhand;stap voor stap;langzaam;steeds meer;meer en meer
ついていません	=	unlucky	geen geluk hebben
ないで	=	stop;do not	zonder te;zonder
世界	せかい	world	wereld
優先	ゆうせん	priority	prioritaire
十六番目		sixteenth	zestiende
博物館	はくぶつかん	museum	museum
始まり	はじまり	beginning	begin
始まります	はじまります	will begin;is starting;starts;begins;will start	
新宿		Shinjuku	Shinjuku
曇り	くもり	cloudiness	bewolkt
歌います	うたいます	will sing;sing;sings	
終了時間		end time	eindtijd
船長	せんちょう	captain	kapitein
見学します	けんがくします	visit;tour;inspect;observe;study visit	bezichtigen;bezoeken;inspecteren;rondkijken;bekijken;rondleiding volgen;excursie maken
銀行	ぎんこう	bank	bank
#213	diversity	diversity	Daily Life: Describe daily routines	Kennis: Deel wat je weet
かんげいします	=	welcome;greet;receive;accept;embrace;introduce	verwelkomen;begroeten;ontvangen;accepteren;waarderen
三番目		third	derde
体験します	たいけんします	experience;undergo;go through;try out;participate in	ervaren;beleven;ondervinden;meemaken;deelnemen
十巻		ten volume	tien delen
慣れます	なれます	get used to;become accustomed to;adapt to;familiarize oneself with;settle in	
本当に	ほんとうに	really	echt
焼きそば	やきそば	yakisoba	yakisoba
畳	たたみ	tatami	tatami
畳みます	たたみます	fold	vouwen;opvouwen;dichtklappen;samenvouwen;opbergen
知識	ちしき	knowledge	kennis
科目	かもく	subject	vak
興味がない		not interested	geen interesse;niet geïnteresseerd;onverschillig;ongeïnteresseerd;geen belangstelling
論理	ろんり	logic	logica
配ります	くばります	distribute;hand out;deliver;allocate;give out;supply;assign	uitdelen;uitreiken;overhandigen;verspreiden;bezorgen;geven;leveren
骨	ほね	bone	bot
#214	negotiation and persuasion	negotiation and persuasion	Projects: Assign project tasks	Overleg: Bespreek taken in je groep
ようなきがします	=	feel like	het lijkt alsof
コスト	=	cost	kosten
スピード	=	speed	snelheid
メートル	=	meter	meter
ワゴン車	ワゴンしゃ	van	bus
十番目		tenth	tiende
大事なところ	だいじなところ	important point	belangrijk punt
所	ところ	place	plaats
担当します	たんとうします	be in charge of;take charge of;be responsible for;handle;manage;oversee	
気がします		feel;think;have a feeling;seem;appear;have a sense;have a hunch	
燃やせないゴミ		non-combustible waste	niet-verbrandbaar afval
解決	かいけつ	solution	oplossing
追加の		additional	aanvullend
違います	ちがいます	is incorrect;is wrong;is not correct;is not right;is not the case;are different;it isn't	verschillen;fout zijn;anders zijn;niet kloppen;variëren
#215	romantic relationships	romantic relationships	Feelings: Share your feelings	Relatie: Praat over relaties
じゃう	=	do completely;end up doing;finish doing;regret doing;keep doing;do unintentionally	doen;maken;uitvoeren;afmaken;voltooien;per ongeluk doen;onbedoeld doen;onbewust doen
ちゃう	=	going to negative	doen;maken;verkeerd doen;per ongeluk doen;afmaken;per ongeluk vergeten;te veel nadenken;nerveus worden;zich zorgen maken;gebeuren
なんだか	=	somehow	om de een of andere reden
んだ	=	explanation;emphasis	omdat;want;dus;namelijk;toch;hè;weet je
んだって	=	I heard that;they say that;apparently;it is said that;you know that	heb ik gehoord
八個		eight	acht
応援します	おうえんします	support;cheer;encourage;root for;cheer on	aanmoedigen;steunen;supporten;bemoedigen;ondersteunen
怒って		angrily	boos
性格	せいかく	personality	karakter
悩みます	なやみます	worry;be troubled;be distressed;agonize;suffer;be concerned;consider;ponder	piekeren;tobben;worstelen;zich zorgen maken;twijfelen;overwegen;nadenken
悲しい	かなしい	sad	verdrietig;triest;droevig;bedroefd;treurig;ongelukkig
素直	すなお	honest	oprecht
義務	ぎむ	duty	plicht
雑誌	ざっし	magazine	tijdschrift
#216	public spaces	public spaces	Gatherings: Invite friends to a gathering	Locaties: Vertel waar je bent
かな	=	I wonder if;perhaps;maybe	misschien;toch;wel;ik vraag me af;zou kunnen;zou;vraag me af of
かも	=	may be;perhaps;maybe;might be	misschien
じゃダメ	=	not good;no good;not allowed;unacceptable;must not;cannot;no use;must not do;should not do;don't do	niet goed;niet toegestaan;niet acceptabel;mag niet;moet niet
ちゃダメ	=	must not;cannot;should not;no good to;not allowed to;don't;do not	mag niet
でかい	=	huge;giant	groot;fors;enorm;reusachtig;gigantisch;kolossaal
でしょ	=	right	toch
アルコール	=	alcohol	alcohol
キャプテン	=	captain	aanvoerder
ノンアルコール	=	non-alcoholic	alcoholvrij
何もない	なにもない	nothing	niets;niks;leeg;zonder;kaal;er is niets
刑務所	けいむしょ	prison	gevangenis
場合	ばあい	case	geval
広告を出します		place an advertisement;advertise;publish an advertisement;run an ad;put out an advertisement;promote	een advertentie plaatsen;adverteren;reclame maken;promoten;bekendheid geven aan
深呼吸をします		take a deep breath;breathe deeply;do deep breathing;take deep breaths	diep ademhalen;diep inademen;diep uitademen;een diepe ademhaling nemen
濃い	こい	strong;powerful;intense;thicker;heavy;concentrated	dik;sterk;intens;geconcentreerd;donker;smaakvol;vol van smaak
覚えていますか		Do you remember;Are you remembering;Have you remembered;Do you recall;Do you recollect	herinneren;herinner je
観戦します	かんせんします	watch a game;watch a match;spectate;attend a game;observe a match;watch	toekijken;volgen;bijwonen;kijken naar;supporteren
#217	rural life	rural life	Home Life: Describe daily routines	Dagelijks: Geniet van het dorpsleven
もくげきしゃ	=	witness	getuige
一度	いちど	once	een keer
個性	こせい	individuality	individualiteit
努力	どりょく	effort	inspanning
収納	しゅうのう	storage	opbergruimte
家事	かじ	housework	huishoudelijk werk;huishouding;huiselijk werk;huishoudelijke taken
小さな	ちいさな	small	klein
屋外	おくがい	outdoor	buiten
明かり	あかり	light	licht
曲がり角	まがりかど	curve	bocht
泊まるところ		place to stay	overnachtingsplek
焼きます	やきます	bakes;bake	
直ります	なおります	be fixed;be repaired;get better;recover;be cured;be mended;be restored	genezen;herstellen;repareren;maken
落ち着きます	おちつきます	calm down;settle down;compose oneself;relax;be calm;become calm;be settled;be composed;feel at ease;feel comfortable	kalmeren;tot rust komen;zich vestigen;zich ontspannen;zich beheersen;kalm worden
観光客	かんこうきゃく	tourist	toerist
軽い	かるい	light;lightweight;mild	licht;lichtgewicht;gering;mild;soepel;gemakkelijk;licht verteerbaar
離れます	はなれます	to separate;to leave;to be apart;to distance oneself;to detach;to move away;to move away from	verwijderen;afstand nemen;scheiden;loskomen;uit elkaar gaan;weggaan;verlaten
#218	museum visits	museum visits	Museum: Ask about museum rules	Museum: Vertel over een schilderij
まさかの	=	unexpected	onverwacht
わけがない	=	no way	onmogelijk
信号	しんごう	traffic light	verkeerslicht
兄弟	きょうだい	sibling	broer;broers;broeder
入場	にゅうじょう	admission	toegang
勉強になります	べんきょうになります	I learn a lot;It's very informative;It's educational;I find it helpful;It's enlightening;It's instructive	
原宿	はらじく	Harajuku;harajuku's	
席	せき	seat	stoel
後ろ向きに		backward;backwards;pessimistically;negatively	
意味があります	いみがあります	to be meaningful;to have meaning;to make sense;to be significant;to matter;to be worthwhile;to be worth doing	
払います	はらいます	pay;will pay;pays;I'm paying	
最後尾	さいこうび	end of the line	einde
次に	つぎに	next	daarna
欲しい	ほしい	wants;want;you want;wanted;didn't	willen;verlangen;nodig hebben;graag hebben;willen hebben
水筒	すいとう	water bottle	waterfles
混雑している		crowded;congested;packed;busy;jammed	
祝日	しゅくじつ	holiday	feestdag
被ります	かぶります	wears;will wear;wear	
#219	landmarks	landmarks	Sights: Describe famous sights	Tocht: Beschrijf wat je ziet
ありえない	=	impossible	
いけません	=	you may not;it is not allowed;cannot;you are not allowed to	niet goed;niet mogen;verboden;niet toegestaan;niet kunnen;moeten
じっと	=	still	stil
めいわく	=	nuisance	last
伝統的	でんとうてき	traditional	traditioneel
冒険者	ぼうけんしゃ	adventurer	avonturier
国立	こくりつ	national	nationaal
星	ほし	star	ster
案内の人		guide	gids
資料	しりょう	material	materiaal
離れています		be away;be separated;be distant;be apart;be detached;be far from	
頂上	ちょうじょう	summit	top
#220	civic life	civic life	Groups: Ask about joining groups	Project: Vraag naar projectinformatie
への	=	with;towards;into;toward;to;for	naar;tot;richting;aan;voor
代理店	だいりてん	agency	agentschap
六巻		six volume	zes delen
届けます	とどけます	deliver;send;submit;report;notify;bring	bezorgen;afleveren;leveren;overhandigen;sturen;afgeven
巻	まき	volume	deel
市民	しみん	citizen	burger
市長	しちょう	mayor	burgemeester
掛かります	かかります	takes;take	kosten;duren;tijd kosten;tijd nemen
掲示板	けいじばん	bulletin board	prikbord
渡します	わたします	submit;pass	overhandigen;geven;afgeven;overdragen;bezorgen;uitdelen
知らせます	しらせます	inform	informeren;melden;laten weten;berichten;mededelen;aankondigen
親子	おやこ	parent-child	ouder-kind
言い訳	いいわけ	excuse	uitvlucht
論文	ろんぶん	thesis	scriptie
高校生	こうこうせい	high school student	middelbare scholier
#221	extending accepting and declining invitations	extending accepting and declining invitations	Gathering: Talk about party plans	Locatie: Vraag waar iets is
お久しぶり	おひさしぶり	long time no see	lang niet gezien
そういうこと	=	that kind of thing	dat soort dingen
んですけど	=	because;so;but;you see;the thing is;excuse me;I have a question;I want to ask;I need;could you;would you	maar;echter;toch;hoewel;want;excuseer;sorry;zou je kunnen;zou u kunnen;kan;kunt u;wil;wilt
完全	かんぜん	complete	volledig
感動します	かんどうします	be moved;be touched;be impressed;be deeply affected;be emotionally moved	ontroeren;raken;indruk maken;bewegen;ontroerd zijn;geraakt worden
手編み	てあみ	hand knitting	handbreien
支払います	しはらいます	pays;pay	
数えます	かぞえます	counts;count	tellen;enumereren
本当は		actually	eigenlijk
気にします		to mind;to care about;to be concerned about;to worry about;to pay attention to	zich druk maken;zich zorgen maken;geven om;letten op;zich aantrekken van
消防車	しょうぼうしゃ	fire truck	brandweerwagen
演技	えんぎ	acting	optreden;vertolking;uitvoering;voorstelling;toneelspel;acteren;acteerprestaties
状況	じょうきょう	situation	situatie
要素	ようそ	element	element
質問	しつもん	question	vraag
間もなく	まもなく	soon	binnenkort
風船	ふうせん	balloon	ballon
#222	volunteering	volunteering	Teamwork: Share ideas with your team	Buurt: Geef je mening over je buurt
として	=	as;in	als;in de hoedanigheid van;als zijnde;voor;namens
多分	たぶん	probably	waarschijnlijk
居酒屋	いざかや	izakaya	izakaya
引き出し	ひきだし	drawer	lade
恥ずかしい	はずかしい	embarassed;embarrassed;embarrassing;embarrassment	verlegen;beschaamd;schuchter;gênant;schaamtevol
持ち上げます	もちあげます	lift;raise;pick up;elevate	optillen;tillen;omhoog tillen;heffen;ophijsen
毎回	まいかい	every time	elke keer
研究	けんきゅう	research	onderzoek
空っぽ	からっぽ	empty	leeg
繋ぎます	つなぎます	connect;tie;link;join;fasten;bind;attach;plug in	verbinden;vastmaken;koppelen;aansluiten;binden
考え	かんがえ	idea	idee
自分勝手	じぶんかって	selfish	egoïstisch
虫	むし	insect	insect
近所の人		neighbor	buurtbewoner
追加で		additionally	extra
重さ	おもさ	weight	gewicht
野菜	やさい	vegetable	groente
#223	governmental systems	governmental systems	Campus: Ask about campus offices	Samenleving: Leg uit wie wat doet
からは	=	from;since;as for;because of;out of;starting from;as of;beginning with	vanaf;sinds;uit;van;vanaf dat moment;vanaf dan
だいとうりょう	=	president	president
とは	=	that	wat is;betekent;houdt in;is;betekent dat;met;samen met
までは	=	until;up to;as far as;by the time;before	tot;totdat;tot aan;tot op;tot zover;tot en met
企業	きぎょう	business;businesses;corporation;enterprise;corporations;companies	bedrijven
作物	さくもつ	crop	gewas
国際関係	こくさいかんけい	international relations	internationale betrekkingen;internationale relaties;internationale verhoudingen;internationale betrekkingenstudies
女王	じょおう	queen	koningin
政治家	せいじか	politician	politicus
本気で	ほんきで	seriously	serieus
毎晩	まいばん	every night	elke avond
民主主義	みんしゅしゅぎ	democracy	democratie
現実的	げんじつてき	realistic	realistisch
紅茶	こうちゃ	black tea	zwarte thee
預かります	あずかります	take care of;keep;look after;hold;take charge of;hold on to;keep safe	bewaren;oppassen;verzorgen;in bewaring nemen;beheren;aannemen;in bewaring houden
食堂	しょくどう	cafeteria	kantine
#224	disability	disability	Beginnings: Talk about what you need	Centrum: Deel je zorgen
しか	=	only;deer	alleen;slechts;alleen maar
とします	=	to do;to decide;to assume;to try;to make;to set;to establish	doen alsof;aannemen;besluiten;proberen;veronderstellen;vaststellen
はじめ	=	initial	begin
仲間	なかま	colleague	kameraad
個人的に		personally	persoonlijk
前みたいに		like before	zoals vroeger
効率のいい		efficient;effective;productive;economical;well-organized;streamlined	efficiënt;doeltreffend;doelmatig;rendabel;effectief;praktisch
可能	かのう	possible	mogelijk
地震	じしん	earthquake	aardbeving
城	しろ	castle	kasteel
大きい声を出します		speak loudly;raise one's voice;shout;talk loudly;speak up	hard roepen;luid spreken;hard praten;luid schreeuwen;luid roepen
少しずつ	すこしずつ	little by little	geleidelijk
最後	さいご	end	laatste
無理しなくていい		you don't have to overdo it;no need to push yourself;it's okay not to strain yourself;you don't need to force yourself;take it easy;don't overexert yourself	doe niet te veel;overdrijf niet;forceer jezelf niet;het is niet nodig om je in te spannen;neem het rustig aan;doe rustig aan
速く	はやく	quickly	snel
違法	いほう	illegal	illegaal
飾ります	かざります	decorate;adorn;ornament;embellish;display	
#225	pet care	pet care	Pets: Describe your pet's needs	Huisdier: Vertel over je huisdier
ほとんどは	=	mostly	voor het grootste deel
エサ	=	feed	voer
ゴミ箱	ごみばこ	trash can	vuilnisbak
ベル	=	bell	bel
ペットショップ	=	pet shop	dierenwinkel
一昨日	おととい	the day before yesterday	eergisteren
体調	たいちょう	physical condition	lichaamstoestand
内容	ないよう	content	inhoud
可愛い	かわいい	pretty;cute	schattig;lief;knap;aandoenlijk
大切に思っています		cherish;value;care about;hold dear;treasure;care for;have affection for	koesteren;waarderen;belangrijk vinden;liefhebben;dierbaar vinden
幸せそうに		happily	gelukkig
息	いき	breath	adem
新鮮	しんせん	fresh	vers
気持ち悪い	きもちわるい	disgusting;gross	misselijk;naar;onaangenaam;vies;weerzinwekkend;ranzig;griezelig
象	ぞう	elephant	olifant
革	かわ	leather	leer
首輪	くびわ	collar	halsband
#226	literature	literature	Books: Describe a book	Boeken: Vertel over je favoriete boek
ぴったり	=	perfect	perfect passend
ぼうけん	=	adventure	avontuur
みたいに	=	like	zoals
もうけます	=	to make a profit;to earn;to gain;to establish;to beget	verdienen;verkrijgen;maken;opbrengen;winst maken;behalen
ドキドキ	=	heartbeat	bonzen
メディア	=	media	media
一冊	いっさつ	one book	één boek
伝える	つたえる	convey;tell;express;hadn't	informeren;doorgeven;mededelen;overbrengen;rapporteer;uitdrukken;vertellen;noemt
利益	りえき	profit	winst
弓	ゆみ	bow	boog
怖い	こわい	scary;frightened of;afraid of;scared of;spooky	eng;angstaanjagend;beangstigend;bang;griezelig
教科書	きょうかしょ	textbook	leerboek
正確	せいかく	accurate	precies
災害	さいがい	disaster	ramp
現実	げんじつ	reality	realiteit
生きます	いきます	live	
辞書	じしょ	dictionary	woordenboek
#227	economic systems	economic systems	Reasoning: Explain your thinking	Lesstof: Geef een voorbeeld
かわりに	=	instead of	in plaats van
主に	おもに	mainly	voornamelijk
他の		other	ander
付けます	つけます	attach;put on;turn on;switch on;apply;add;stick;wear;mark;assign;fix	
代わりに	かわりに	instead	in plaats daarvan
単語	たんご	word	woord
声	こえ	voice	stem
授業	じゅぎょう	class	les
牛	うし	cow	koe
社会	しゃかい	society	maatschappij
行動をとる	こうどうをとる	take action;act;take measures;take steps;behave;initiate action;make a move	
要点	ようてん	main point	belangrijk punt
論理的	ろんりてき	logical	logisch
靴	くつ	shoe	schoen
#228	sustainability	sustainability	Admission: Talk about payment options	Contant: Zeg waarom je cash nodig hebt
これからも	=	from now on	ook in de toekomst
そのまま	=	as is	ongewijzigd
ほほ	=	cheek	wang
まま	=	still	zoals;toestand;situatie;blijven;onveranderd;laten;ongewijzigd laten
インドア派	インドアは	indoor person	binnenmens
一人暮らしをします		live alone;live by oneself;live on one's own;start living alone;begin living alone	alleen wonen;zelfstandig wonen;op zichzelf wonen;zelfstandig gaan wonen
入場料	にゅうじょうりょう	admission fee	toegangsprijs
割引き	わりびき	discount	korting
暑さ	あつさ	heat	hitte
次からは		from next time onward	vanaf de volgende keer
比較的	ひかくてき	relatively	relatief
濡れた		wet	
現金	げんきん	cash	contant geld
目の不自由	めのふじゆう	visually impaired	visueel gehandicapt
衣装	いしょう	costume	kostuum
込みます	こみます	to be crowded;to be packed;to be congested;to be full;to be busy;to go into;to include;to be complex;to get crowded;to become crowded	vol raken;druk worden;zich ophopen;zich verzamelen;opstapelen;druk zijn;vol zijn
音量	おんりょう	volume	volume
#229	measurements	measurements	Challenges: Discuss baking challenges	Herinnering: Herken vertrouwde recepten
それに	=	besides	bovendien
だって	=	even	zelfs
だもの	=	because	want
なめらか	=	smooth	glad
の一種です		is a type of;is a kind of;is a variety of;is a species of;is a form of	is een soort van;is een type van;behoort tot de categorie van;is een variant van;is een vorm van
アピールします	=	appeal;make an appeal;promote;highlight;emphasize;showcase;present	appelleren;aantrekken;opvallen;indruk maken;promoten;benadrukken;laten zien
エリア	=	area	gebied
スペース	=	space	ruimte
タイマー	=	timer	timer
取引	とりひき	transaction	transactie
同じ	おなじ	the same;same	hetzelfde
大きさ	おおきさ	size	grootte
失敗します	しっぱいします	fail	falen;mislukken;fouten maken
建てます	たてます	build	
引っ越します	ひっこします	moves;move	
得意じゃない		not good at	niet goed in;niet bedreven in;niet vaardig in;niet sterk in;niet bekwaam in;niet handig in;niet talentvol in
折れます	おれます	break;snap;fold;bend;give way;yield;oreru	breken;knakken;buigen;afbreken;omvallen
数字	すうじ	number	cijfer
決まり	きまり	rule	regel
若いころ	わかいころ	youth	jonge jaren
#230	aging	aging	Choices: Talk about trying a new sport	Groepen: Vertel over een sportgroep
としたら	=	if;assuming that;supposing that;in case;provided that;in case that	als je zou
のままに	=	still in	zoals het is;ongewijzigd;onveranderd;zoals het was;in dezelfde staat;in;met;terwijl;zonder iets te veranderen
チャレンジ	=	challenge	uitdaging
八巻	はちまち	eight volumes;eight scrolls;eight rolls;eight books	acht deel
切符売り場	きっぷうりば	ticket office	kaartjesloket
印象に残る	いんしょうにのこる	memorable;impressive;striking;unforgettable;leave an impression;remarkable	indruk maken;bijblijven;een indruk achterlaten;memorabel zijn;indruk nalaten;opvallend;gedenkwaardig
収入	しゅうにゅう	income	inkomen
年をとります	としをとります	grow old;age;get older;become older;become old	ouder worden;verouderen;jaartjes erbij krijgen
意外	いがい	unexpected	verrassend
柔道	じゅうどう	judo	judo
歴史のある		historic	historisch
残業します	ざんぎょうします	work overtime	
背中	せなか	back	rug
貯金	ちょきん	saving	spaargeld
赤ちゃんがいる		have a baby;have an infant;be with a baby;there is a baby	een baby hebben;een baby in huis hebben;er is een baby
#231	clothes shopping	clothes shopping	Clothes: React to great deals	Kleding: Beschrijf kledingstukken
なんて	=	that;what ...;how ...;what	
やや	=	somewhat	enigszins
ゆったり	=	relaxed;spacious;loose;comfortable;easygoing;unhurried;roomy	los
アウトレット	=	outlet	outlet
ウエスト	=	waist	taille
カーディガン	=	cardigan	cardigan
ポリエステル	=	polyester	polyester
上品	じょうひん	elegant;refined;classy;sophisticated;tasteful;graceful	elegant
下着	したぎ	underwear	onderkleding
倍	ばい	times	keer
値下げ	ねさげ	price reduction;discount;markdown;price cut;price drop	
白	しろ	white	Witte
紫	むらさき	purple	paars
茶色	ちゃいろ	brown	bruin
見つかります	みつかります	can find	
防水	ぼうすい	waterproof	waterdicht
黒	くろ	black	zwart
#232	personal experiences 2	personal experiences 2	Choices: Describe your opinions	Keuze: Deel je gevoel bij keuzes
きっかけ	=	trigger	aanleiding
さまざま	=	various	verschillend
そんな	=	such a;like that	zo'n;dergelijk;zulk;zulke;dat soort;zo;zozeer
ところで	=	by the way	trouwens
のせいで	=	because of	door;vanwege;dankzij;ten gevolge van;als gevolg van
やはり	=	as expected	toch
事情	じじょう	circumstance	omstandigheid
人間関係	にんげんかんけい	human relationship	
出会い	であい	encounter	ontmoeting
別に	べつに	not particularly	niet echt
大半	たいはん	majority	
後悔	こうかい	regrets	
成長	せいちょう	growth	groei
挑戦	ちょうせん	challenge	uitdaging;poging;poging wagen;proberen
短所	たんしょ	weakness	zwak punt
終わります	おわります	end;end s;ends	
結局	けっきょく	in the end	uiteindelijk
緊張	きんちょう	tension	spanning;nervositeit;stress;zenuwachtigheid
自信	じしん	confidence	zelfvertrouwen
覚悟	かくご	readiness;resolution;preparedness;determination;acceptance;willingness	
記念に		as a memento	als aandenken
達成感	たっせいかん	sense of achievement	gevoel van voldoening
選択	せんたく	choice	keuze
#233	playing or training for a sport	playing or training for a sport	Training: Share your training goals	Sportteam: Leg uit waarom je meegaat
すると	=	when	dan;toen;vervolgens;daardoor;daarmee;wanneer
つもりで	=	intend	met de bedoeling
まだまだ	=	still far from	nog lang niet
わけにはいかない	=	have no choice but to do	niet kunnen vermijden
アドバイス	=	advice	advies
グラウンド	=	field	veld
パス	=	pass	passen
ボール	=	ball	bal
メンタル	=	mental state	
ユニフォーム	=	uniform	uniform
作戦	さくせん	strategy	
優勝	ゆうしょう	championship victory	overwinning
合宿	がっしゅく	training camp	trainingskamp
易しい	やさしい	easy	
本番	ほんばん	event	wedstrijd
泊	はく	nights	Verblijf;verblijf;verblijven
蹴ります	けります	kick	
防具	ぼうぐ	protective gear	beschermingsuitrusting
陸上	りくじょう	track and field	atletiek
#234	school 2	school 2	School: Hand out classroom materials	School: Deel vellen uit aan leerlingen
かさ立て		umbrella stand	parapluhouder
ずつ	=	each	per;elk;ieder;telkens;ieder afzonderlijk;afzonderlijk;stuk voor stuk
など	=	things like;or something;et cetera;something like	enzovoort;enz.;en zo;en dergelijke;en andere;zoals;bijvoorbeeld
プリント	=	handout	werkblad
下駄箱	げたばこ	shoe locker	schoenenkast
休み時間	やすみじかん	recess	pauze
体育館	たいいくかん	gymnasium	gymzaal
児童	じどう	child	leerling
制服	せいふく	uniform	uniform
加えます	くわえます	add;adds	
図書室	としょしつ	library	bibliotheek
子供	こども	child	kind
廊下	ろうか	corridor	gang
感想	かんそう	impression	indruk
校庭	こうてい	schoolyard	schoolplein
校門	こうもん	school gate	schoolpoort
消しゴム	けしゴム	eraser	gum
総合的	そうごうてき	comprehensive	omvattend
集中力	しゅうちゅうりょく	concentration	concentratie
#235	mental health	mental health	Wellness: Describe how you relax	Rust: Vertel hoe jij ontspant
なんか	=	something;kind of;negative judgement;sort of;a little;somewhere like;anything	
一時的に		temporarily	tijdelijk
体操	たいそう	exercise	gymnastiek
健康的	けんこうてき	healthy	gezond
冷静	れいせい	calm	kalm
国際交流	こくさいこうりゅう	international exchange	
安心	あんしん	peace of mind	gerust
心理的	しんりてき	psychological	psychologisch
感情	かんじょう	emotion	gevoel
栄養	えいよう	nutrition	voeding
眠ります	ねむります	sleep;sleeps	
瞑想	めいそう	contemplation;meditation;reflection;introspection;meditating	
精神	せいしん	mind	geest
非常に	ひじょうに	extremely	zeer
飲み放題	のみほうだい	all-you-can-drink	onbeperkt drinken
#236	neighborhood	neighborhood	Neighborhood: Describe local houses	Buurt: Beschrijf je buurt
コインランドリー	=	laundromat	
ポスト	=	postbox	brievenbus
一人暮らし	ひとりぐらし	living alone	alleen wonen
一戸建て	いっこだて	detached house	vrijstaand huis
交通量	こうつうりょう	traffic volume	verkeersvolume
住みます	すみます	live	
八百屋	やおや	greengrocer	groentewinkel
宅配	たくはい	delivery	thuisbezorging
弁当屋	べんとうや	bento shop	lunchboxwinkel
挨拶します	あいさつします	greets	
日当たり	ひあたり	sunlight exposure	zonlichttoetreding
泥棒	どろぼう	thief	dief
清潔	せいけつ	clean	schoon
狭い	せまい	narrow;confined;small;cramped	smal;nauw;krap;eng;beperkt
町内	ちょうない	neighborhood	buurt
空き地	あきち	vacant lot	braakliggend terrein
賃貸	ちんたい	rental property	huurwoning
資源ゴミ	しげんごみ	recyclable waste	recyclebaar afval
踏切	ふみきり	level crossing	overweg
防犯カメラ	ぼうはんカメラ	security camera	bewakingscamera
飲食店	いんしょくてん	restaurant	horecagelegenheid
#237	celebration	celebration	Party: Ask about the party	Feest: Vertel over een feest
あんな	=	such	zulke
ちなみに	=	by the way	trouwens
っけ	=	again	
シャンパン	=	champagne	champagne
乾杯	かんぱい	toast	proost
優雅	ゆうが	graceful	elegant
割れています		is broken	
勤務先	きんむさき	workplace	werkplek
化粧	けしょう	makeup	make-up
司会者	しかいしゃ	host	presentator
忘年会	ぼうねんかい	year-end party	eindejaarsfeest
感謝	かんしゃ	gratitude;gratefulness;appreciation;thankfulness	
挨拶	あいさつ	greeting	groet
新年会	しんねんかい	New Year's party	nieuwjaarsfeest
歓迎会	かんげいかい	welcome party	welkomstfeest
華やか	はなやか	colorful	feestelijk
贈ります	おくります	give as a present	
願い	ねがい	wish	wens
#238	politics	politics	Politics: Share your views on politicians	Politiek: Leg uit hoe je inflatie merkt
しばしば	=	often	vaak
ほぼ	=	almost	bijna
インフレ	=	inflation	inflatie
与党	よとう	ruling party	regeringspartij
候補者	こうほしゃ	candidate	kandidaat
内閣	ないかく	cabinet	kabinet
国民	こくみん	the citizens;the citizen;a citizen;the citizenry;nationals	volk
年金	ねんきん	pension	pensioen
投票	とうひょう	voting	stemmen;stemmen op;stemming;voteren
政治	せいじ	politics	politiek
景気	けいき	economy	conjunctuur
総理大臣	そうりだいじん	prime minister	premier
議会	ぎかい	parliament	parlement
選挙	せんきょ	election	verkiezing
野党	やとう	opposition party	oppositie
#239	time management	time management	Routines: Talk about daily routines	Routine: Vertel over je dagindeling
あのさ	=	hey	hé
ありがとう	=	thank you	bedankt
ってこと	=	means that	dat betekent
の間		for;during;between	
マルチタスク	=	multitasking	multitasken
ルーティン	=	routine	routine
ワンチャン	=	a chance	misschien
予定表	よていひょう	schedule	rooster
代金	だいきん	cost	prijs
余裕	よゆう	leeway	ruimte
作業	さぎょう	work;operation;task;labor;job;construction;manufacturing;processing	
切り替え	きりかえ	Switched	
助かる	たすかる	be saved;be helped;be rescued;be useful;be beneficial;be spared;be relieved;be helpful	
昼寝	ひるね	nap	dutje
時期	じき	period	periode
検査	けんさ	examination	controle
熱	ねつ	fever	koorts
締め切り	しめきり	deadline	deadline
複数	ふくすう	multiple	meervoudig
#240	recipes	recipes	Cooking: Describe making soup	Recepten: Leg een recept uit
おたま	=	ladle	pollepel
ごま油	ごまあぶら	sesame oil	sesamolie
さっと	=	quickly	snel
しょうが	=	ginger	gember
ひとつまみ	=	pinch	snufje
みじん切り	みじんぎり	mince	fijngehakt
みりん	=	mirin	mirin
アルミホイル	=	aluminum foil	aluminiumfolie
サクサク	=	crisp	krokant
具材	ぐざい	ingredient	ingrediënt
出汁	だし	dashi	dashi
含みます	ふくみます	includes;contains	
大量	たいりょう	large quantities	grote hoeveelheid;massa;veel;overvloed;bulk
弱火	よわび	low heat	laag vuur
溶かします	とかします	melt;dissolve	
砂糖	さとう	sugar	suiker
計ります	はかります	measure	
豆腐	とうふ	tofu	tofu
豚肉	ぶたにく	pork	varkensvlees
酸っぱい	すっぱい	sour	
#241	workplace communication	workplace communication	Meetings: Express concerns at meetings	Kantoor: Beschrijf een collega
あいまい	=	unclear	onduidelijk
がち	=	tends	geneigd zijn om
っぽい	=	looks like a;look like	-achtig;lijkend op;neigend naar;typisch voor;geneigd tot;stoffig
なるべく	=	as much as possible	zo veel mogelijk
丁寧	ていねい	polite	beleefd
了解	りょうかい	roger;understood;okay;consent;comprehension;approval;sure	
件名	けんめい	subject	onderwerp
入力ミス		input error	typfout
出席します	しゅっせきします	I'm attending;present;presents;is attending	
司会	しかい	hosting	voorzitter
形式	けいしき	format	vorm
念のため	ねんのため	just in case	voor de zekerheid
社内	しゃない	in-house	intern
要求	ようきゅう	request;claim;demand	
規則	きそく	rule	regel
詳細	しょうさい	detail	detail
誤解	ごかい	misunderstanding;miscomprehension;misunderstandings	
#242	journalism	journalism	News: Summarize news reports	Nieuws: Vertel wat je hebt gehoord
さすがに	=	as expected	
どおり	=	as	zoals
アナウンサー	=	announcer	nieuwslezer
フェイクニュース	=	fake news	nepnieuws
下書き	したがき	draft	concept
具体的	ぐたいてき	concrete	concreet
図表	ずひょう	chart	grafiek
報道	ほうどう	report	nieuwsbericht
批評	ひひょう	critique	kritiek
放送	ほうそう	broadcast	
放送局	ほうそうきょく	broadcasting station	omroep
明らかに		clearly	duidelijk
独自	どくじ	unique	uniek
現地	げんち	local	op locatie;ter plekke;plaatselijk;ter plaatse;lokaal;plekke
編集	へんしゅう	edit;editing	
視聴者	しちょうしゃ	viewer	kijker
記者会見	きしゃかいけん	press conference	persconferentie
説得力	せっとくりょく	persuasiveness	overtuigingskracht
重要性	じゅうようせい	importance	belangrijkheid
関係者	かんけいしゃ	people involved	betrokkene
#243	video games	video games	Gaming: Share ways to cooperate	Gaming: Omschrijf personages
bgm		background music	achtergrondmuziek
eスポーツ		eSports	e-sports
こそ	=	emphasis particle;exactly;precisely;indeed;surely	juist
アイテム	=	item	item
クエスト	=	quest	quest
コントローラー	=	controller	controller
スコア	=	score	score
ランキング	=	ranking	ranglijst
古典的	こてんてき	classic	klassiek
安定した	あんていした	stable	stabiel
宝物	たからもの	treasure	schat
対戦	たいせん	match;game;contest;battle;competition;play against	
強力	きょうりょく	powerful	krachtig
有利	ゆうり	advantage	voordeel
決勝	けっしょう	final	finale
直感的	ちょっかんてき	intuitive	intuïtief
装備	そうび	equipment;gear;outfit;apparatus;installation;preparation;kit;belongings	
難易度	なんいど	difficulty	moeilijkheidsgraad
#244	life goals	life goals	Goals: Share your goals	Doelen: Vertel over je doelen
としても	=	also ... as	
チャンス	=	chance	kans
中心	ちゅうしん	center	kern
判断力	はんだんりょく	judgment	oordeelsvermogen
効果的	こうかてき	effective	effectief
同時に	どうじに	at the same time	tegelijkertijd
実現	じつげん	realization;implementation;materialization;achievement;fulfillment;coming true	
時間管理	じかんかんり	time management	tijdbeheer
柔軟性	じゅうなんせい	flexibility	flexibiliteit
目安	めやす	guideline	richtlijn
短期的	たんきてき	short-term	korte termijn
磨きます	みがきます	polishes;brush;polish;brushes	
規模	きぼ	scale	schaal
資格	しかく	qualification	kwalificatie
達成	たっせい	reach;accomplishment;accomplish;achieve;achievement	
長期的	ちょうきてき	long-term	langdurig
#245	career choices	career choices	Careers: Explain your job choice	Werk: Leg uit wat belangrijk is in je werk
ごとに	=	per each	per
やりがい	=	sense of fulfillment	voldoening;zinvolheid;motivatie;uitdaging;beloning
リモートワーク	=	remote work	thuiswerken
事務	じむ	administration	
働き方	はたらきかた	way of working	werkwijze
公務員	こうむいん	civil servant	ambtenaar
出張	しゅっちょう	business trip	zakenreis
創造力	そうぞうりょく	creativity	creativiteit
勤務時間	きんむじかん	working hours	werkuren
外資系	がいしけい	foreign-affiliated	buitenlands bedrijf
学歴	がくれき	educational background	opleidingsachtergrond
専門	せんもん	specialization	specialisme
時給	じきゅう	hourly wage	uurloon
月給	げっきゅう	monthly salary	maandloon
有給休暇	ゆうきゅうきゅうか	paid leave	betaalde vakantie
稼ぎます	かせぎます	earn;earns;make	
職業	しょくぎょう	occupation	beroep
課長	かちょう	section chief	afdelingshoofd
責任	せきにん	responsibility	verantwoordelijkheid
開発	かいはつ	commercial development	ontwikkeling;exploitatie;ontginning;uitwerking;uitbreiding
#246	environmental protection	environmental protection	Environment: Suggest eco-friendly habits	Milieu: Vertel over energiebesparing
けれども	=	yet;but;even though;Even so	
せんぷうき	=	fan	ventilator
っぱなし	=	left;leaves;leave	aan laten
もしも	=	if;in case;supposing;suppose;even if	als;indien;wanneer;stel dat;mocht;voor het geval
リサイクル	=	recycle;recycling	recyclet;recycleer;Recyclen;gerecycled
ワニ	=	crocodile	krokodil
以下	いか	under	minder dan
充電	じゅうでん	charge	opladen;herladen;bijladen
地球温暖化	ちきゅうおんだんか	global warming	de opwarming van de aarde
大気汚染	たいきおせん	air pollution	luchtvervuiling
太陽光	たいようこう	sunlight	zonlicht
工事	こうじ	construction	bouw
悔しい	くやしい	frustrating;regrettable;vexing;mortifying;annoying;disappointing	
機械	きかい	machine	machine
漁業	ぎょぎょう	fishing industry	visserij
火事	かじ	fire	brand
箸	はし	chopstick	eetstokje
節約	せつやく	save;saving	
豪雨	ごうう	heavy rain	hevige regenval
電気自動車	でんきじどうしゃ	electric car	elektrische auto
#247	city life 2	city life 2	City Life: Compare ways to get around	Openbaar vervoer: Leg uit hoe je reist
ものだ	=	should	
乗り場	のりば	stand	halte
仏像	ぶつぞう	Buddhist statue	Boeddhabeeld
住宅街	じゅうたくがい	residential area	woonwijk
公共交通機関	こうきょうこうつうきかん	public transportation	het openbaar vervoer
劇場	げきじょう	theater	theater
名物	めいぶつ	specialty	specialiteit
喫茶店	きっさてん	café	koffiehuis
夜景	やけい	night view	nachtzicht
始発	しはつ	first train	eerste vertrek
定期券	ていきけん	commuter pass	abonnement
小学校	しょうがっこう	elementary school	basisschool
幼稚園	ようちえん	kindergarten	kleuterschool
時刻表	じこくひょう	timetable	dienstregeling
治安	ちあん	public safety	veiligheid
消防署	しょうぼうしょ	fire station	brandweerkazerne
渋滞	じゅうたい	traffic jam	file
百貨店	ひゃっかてん	department store	warenhuis
窓側	まどがわ	window side	raamkant
運賃	うんちん	fare	
都心	としん	city center	centrum
#248	hiking	hiking	Hiking: Describe hiking challenges	Bergen: Vertel over je bergwandeling
だけで	=	just by	alleen
といったら	=	speaking of	
どっち	=	which one	welke
テント	=	tent	tent
バーナー	=	burner	brander
ロープ	=	rope	touw
予備	よび	spare	reserve
入り	いり	with;join	binnenkomst
寝袋	ねぶくろ	sleeping bag	slaapzak
展望台	てんぼうだい	observation deck	uitkijkplatform
山頂	さんちょう	summit	bergtop
救急箱	きゅうきゅうばこ	first aid kit	EHBO-doos
日没	にちぼつ	sunset	zonsondergang
熱中症	ねっちゅうしょう	heatstroke	
赤	あか	one—red;red;akai	rode
遠回り	とおまわり	detour	omweg
#249	corporate rumors	corporate rumors	Rumors: Ask about office gossip	Gerucht: Deel wat je hebt gehoord
あっという間	あっというま	blink of an eye	in een oogwenk
かぎりでは	=	as far as I know	voor zover
だが	=	but;however;though;although;still	
つい	=	accidentally	per ongeluk
と言えば	といえば	speaking of	
どのよう	=	what kind of	wat voor soort
ひそひそ	=	whisperingly	fluisterend
わざと	=	intentionally	opzettelijk
スキャンダル	=	scandal	schandaal
デリケート	=	delicate	delicaat
先日	せんじつ	the other day	onlangs
大げさ	おおげさ	exaggeration	overdreven
必ずしも	かならずしも	not necessarily	niet noodzakelijkerwijs
推測	すいそく	guessing	
曖昧	あいまい	unclear	vaag
真相	しんそう	truth	ware waarheid
#250	university 2	university 2	College: Share a college memory	College: Vertel over je studie
ゼミ	=	seminar	seminar
出席	しゅっせき	attendance	
前期	ぜんき	first semester	eerste semester
卒業	そつぎょう	graduation;graduating;graduations	afstuderen
博士	はかせ	doctorate holder	doctor
受験	じゅけん	taking an examination;sitting for an exam;exam;test-taking;to take an exam	examen afleggen;toelatingsexamen;tentamen doen;deelnemen aan een examen;meedoen aan een examen
合格	ごうかく	test results;passing;pass;test result	slagen;slagen voor;geslaagd;voldoen;kwalificeren;doorstaan;toelating krijgen tot
基礎的	きそてき	basic	basis
学科	がっか	department	studierichting
学部	がくぶ	faculty	faculteit
学食	がくしょく	cafeteria	universiteitskantine
実習	じっしゅう	practical training	stage
専攻	せんこう	my major;major	
後輩	こうはい	junior	junior
授業料	じゅぎょうりょう	tuition fee	collegegeld
有益	ゆうえき	useful	nuttig
詳しい	くわしい	detailed;full	gedetailleerd;uitvoerig;grondig;deskundig;precies;nauwkeurig;exact
講師	こうし	lecturer	docent
進学	しんがく	advancement to a higher school;going on to the next stage of education;entering a higher-level school;progression to the next grade level;matriculation;continuing education;pursuing further studies	
#251	debate 2	debate 2	Discussion: Explain your opinions	Discussie: Stel kritische vragen
さて	=	now	nou
一方	いっぽう	one side;on the other hand;meanwhile;only;just;one way;unilateral;while;whereas;although	terwijl;aan de ene kant;aan de andere kant;enerzijds;anderzijds
主張	しゅちょう	proposal;argument;statement;arguments;statements;claim;proposals	
各	かく	each	elke
回答	かいとう	answer;response;answers	antwoord;respons;reactie;antwoord geven
妥協	だきょう	compromise;concession;accommodation;settlement	
対立	たいりつ	conflict	conflict
彼ら	かれら	they	zij
根拠	こんきょ	basis	grondslag
正確に		accurately	nauwkeurig
結論	けつろん	conclusion	conclusie
肯定的	こうていてき	positive	positief
視点	してん	perspective	visie
証拠	しょうこ	evidence	bewijs
評価	ひょうか	review;reviews	
説得	せっとく	persuade;persuasion;convince	
貧困問題	ひんこんもんだい	poverty issue	armoedeprobleem
#252	news	news	Stories: Retell surprising stories	Media: Vertel wat je hebt gehoord
あやしい	=	suspicious;dubious;questionable;mysterious;strange;doubtful;shady;fishy;risky;unsafe	verdacht;twijfelachtig;geheimzinnig;onbetrouwbaar;dubieus
おそらく	=	probably	waarschijnlijk
どころか	=	far from	
まるで	=	just like	alsof
会見	かいけん	press conference	
大規模	だいきぼ	large-scale	grootschalig
真実	しんじつ	truth	waarheid
解説	かいせつ	explanation	uitleg
読者	どくしゃ	reader	lezer
速報	そくほう	breaking news	breaking news
重大	じゅうだい	important	ernstig
銅メダル	どうメダル	bronze medal	bronsmedaille
非公式	ひこうしき	unofficial	onofficieel
#253	board games	board games	Games: Share your favorite games	Spel: Vertel over je favoriete spel
じっくり	=	carefully	grondig
と言っても	といっても	even though	hoewel
コマ	=	piece	speelstuk
サイコロ	=	die	dobbelsteen
シャッフル	=	shuffle	schudden
ターン	=	turn	beurt
人数	にんずう	number of people	aantal mensen
勝利	しょうり	victory	overwinning
単純	たんじゅん	simple	eenvoudig
大胆	だいたん	bold	moedig
失格	しっかく	disqualification	diskwalificatie
実力	じつりょく	ability	vaardigheid
引きます	ひきます	will consult;consults a dictionary;consult a dictionary;will catch	
引き分け	ひきわけ	draw	gelijkspel
有効	ゆうこう	valid	geldig
確実	かくじつ	certain	zeker
違反	いはん	violation	overtreding
#254	study abroad	study abroad	Campus: Describe your campus life	Studentenleven: Regel je inschrijving
しかも	=	furthermore	bovendien
にちがいない	=	must be	zeker zijn
やっぱり	=	after all	toch
一層	いっそう	even more	nog meer
中間試験	ちゅうかんしけん	midterm exam	tussentijdse toets
以内に		within	binnen
作文	さくぶん	essay	opstel
健康保険	けんこうほけん	health insurance	ziektekostenverzekering
入学	にゅうがく	enrollment	inschrijving
単位	たんい	credit	studiepunt
寮	りょう	dormitory	dormitorium
手数料	てすうりょう	fee	vergoeding;commissie;toeslag;kosten;transactiekosten;provisie
生活費	せいかつひ	living expenses	levensonderhoudskosten
聞き取り	ききとり	listening comprehension	luisterbegrip
適度	てきど	moderate	matig
郵便	ゆうびん	mail	post
#255	holidays	holidays	Trips: Talk about choosing a hotel	Reis: Vertel over je verblijf
オフシーズン	=	off-season	laagseizoen
ダイビング	=	diving	duik
ツイン	=	twin	twin
一軒屋	いっけんや	detached house	vrijstaand huis
事前に		in advance	van tevoren
入国	にゅうこく	entry	inreis
和室	わしつ	Japanese-style room	
寸前	すんぜん	moment before	net voor
帰省	きせい	homecoming	
年末年始	ねんまつねんし	New Year holiday period	jaarwisseling
往復	おうふく	round trip	retour
新幹線	しんかんせん	Shinkansen	Shinkansen
旅行保険	りょこうほけん	travel insurance	reisverzekering
満室	まんしつ	fully booked	volgeboekt
登山	とざん	mountain climbing	bergbeklimmen
穴場	あなば	hidden gem	geheime plek
#256	entrepreneurship	entrepreneurship	Business: Explain testing	Bedrijf: Overleg met je team
お問い合わせ	おといあわせ	inquiry	contactformulier
に基づいて	にもとづいて	based on	
に関して	にかんして	about;related to;of	jegens
または	=	or;alternatively	
ニーズ	=	need	behoefte
一旦	いったん	once	even
営業	えいぎょう	business	
売上	うりあげ	sales	omzet
戦略	せんりゃく	strategy	strategie
改善	かいぜん	improve;improvement;improvements	verbetering;verbeteren;hervorming;optimalisatie
札幌	さっぽろ	Sapporo	Sapporo
着実に		steadily	gestaag
給与	きゅうよ	salary	salaris
継続的に		continuously	continu
苦情	くじょう	complaint	klacht
資産	しさん	asset	activa
配送	はいそう	delivery	bezorging
#257	baby	baby	Babies: Share advice for new parents	Baby: Stel vragen over babyzorg
おしゃぶり	=	pacifier	speen
おむつ	=	diaper	luier
ベビーベッド	=	crib	babybed
ワクチン	=	vaccine	vaccin
予定日	よていび	due date	uitgerekende datum
体温計	たいおんけい	thermometer	thermometer
出産	しゅっさん	birth	bevalling
妊娠の方		pregnant woman	zwangere vrouw
姉妹	しまい	sister	zus
梅干し	うめぼし	pickled plum	ume-boshi
母乳	ぼにゅう	breast milk	moedermelk
浴室	よくしつ	bathroom	badkamer
熟成	じゅくせい	aging	rijping
粉ミルク	こなミルク	powdered milk formula	
胃	い	stomach	maag
身長	しんちょう	height	lengte
鍋	なべ	pot	pan
風邪	かぜ	cold	verkoudheid
鼻水	はなみず	nasal mucus	neusloop
#258	art	art	Art: Describe your favorite art style	Kunst: Vertel over je favoriete kunst
かけ	=	put	op slot doen
キャンバス	=	canvas	canvas
コントラスト	=	contrast	contrast
傑作	けっさく	masterpiece	meesterwerk
制作	せいさく	production;creation;manufacturing;making;fabrication	productie;vervaardiging;creatie;fabricage;maken
展覧会	てんらんかい	exhibition	tentoonstelling
建築	けんちく	architecture	architectuur
意図	いと	intention	bedoeling
暗闇	くらやみ	darkness	duisternis
滑らか	なめらか	smooth	glad
灰色	はいいろ	gray	grijs
炭	すみ	charcoal	houtskool
筆	ふで	brush	kwast
粘土	ねんど	clay	klei
素材	そざい	material	materiaal
絵画	かいが	painting	schilderij
自画像	じがぞう	self-portrait	zelfportret
芸術家	げいじゅつか	artist	kunstenaar
鮮やか	あざやか	vivid	levendig
#259	attending a sporting event	attending a sporting event	Stadium: Meet friends at the stadium	Stadion: Vertel over een stadionbezoek
お尻	おしり	buttock	kont
だらけ	=	full of	vol
ハーフタイム	=	halftime	rustpauze
丼物	どんぶりもの	donburi dishes	donburi
天井	てんじょう	ceiling	plafond
平成	へいせい	Heisei era 1989-2019	
序盤	じょばん	opening phase	beginfase
延長戦	えんちょうせん	overtime	verlenging
当日券	とうじつけん	same-day ticket	dagkaartje
待ち合わせ	まちあわせ	meeting	afspraak
応援	おうえん	rooting;support;cheering;cheer	aanmoediging;steun;support;aanmoedigen;steunen
新刊	しんかん	new publication	nieuwe uitgave
旗	はた	flag	vlag
昭和	しょうわ	Showa era 1926-1989	
監督	かんとく	coach	regisseur
自由席	じゆうせき	unreserved seat	vrije zitplaats
賑やか	にぎやか	lively	levendig
遅刻します	ちこくします	will be late	
非常口	ひじょうぐち	emergency exit	nooduitgang
#260	negotiation and persuasion 2	negotiation and persuasion 2	Discussion: Share honest opinions	Vergadering: Stel verbeteringen voor
ことはない	=	have never	
そちら	=	you	u
まもなく	=	soon	binnenkort
不充分	ふじゅうぶん	insufficient	onvoldoende
価値	かち	value	waarde
保証	ほしょう	guarantees;guarantee	beloften
反論	はんろん	argue	tegenargumenteren
客観的	きゃっかんてき	objective	objectief
強調	きょうちょう	highlighting	
明確	めいかく	clear	duidelijk
明確に		clearly	duidelijk
率直に		frankly	eerlijk
確認	かくにん	check;confirmation	bevestiging;controle;verificatie;bevestigen;controleren;verifiëren
積極的	せっきょくてき	positive	actief
立場	たちば	position	positie
需要	じゅよう	demand	vraag
#261	scientific discoveries/advancements	scientific discoveries/advancements	Research: Ask for research advice	Wetenschap: Deel onderzoeksresultaten
これら	=	these	deze
それら	=	those	die
である	=	were;is;am;it's;are;was;be	
エネルギー	=	energy	energie
信頼できる		reliable	betrouwbaar
先進的	せんしんてき	advanced	geavanceerd
副作用	ふくさよう	side effect	bijwerking
反応	はんのう	reaction	reactie
基準	きじゅん	standard	norm
変化	へんか	change;changes	transformatie;aanpassing;wijziging;ommekeer;verandering;veranderingen;evolutie;wijzig
安全性	あんぜんせい	safety	veiligheid
性質	せいしつ	nature	aard
感染症	かんせんしょう	infectious disease	infectieziekte
数値	すうち	numerical value	cijfer
構造	こうぞう	structure	structuur
研究します	けんきゅうします	study	
詳細な		detailed	gedetailleerd
資金	しきん	fund	fonds
進歩	しんぽ	progress	vooruitgang
#262	advertising	advertising	Ideas: Share your ideas	Reclame: Bedenk een nieuw reclameplan
イメージ	=	image	imago
オファー	=	offer	aanbieding
キャッチコピー	=	catchphrase	slogan
デメリット	=	disadvantage	nadeel
バナー	=	banner	banner
予測	よそく	prediction;forecast;estimate;projection;anticipation	
予算	よさん	budget	budget
企画	きかく	plan	plan
信用	しんよう	trust	
口コミ	くちコミ	word of mouth	mond-tot-mondreclame
宣伝	せんでん	advertisement;publicity;propaganda;advertising	
成果	せいか	result	resultaat
方針	ほうしん	policy	beleid
比較	ひかく	comparison	vergelijking
関心	かんしん	interest	interesse
魅力	みりょく	charm	aantrekkingskracht
#263	medicine	medicine	Hospital: Describe an accident	Ziekenhuis: Leg uit wat er is gebeurd
めまい	=	dizziness	duizeligheid
下痢	げり	diarrhea	diarree
保険証	ほけんしょう	insurance card	zorgverzekeringskaart
内科	ないか	internal medicine	interne geneeskunde
同意	どうい	agree	
吐き気	はきけ	nausea	misselijkheid
呼吸	こきゅう	breathing	ademhaling
咳	せき	cough	hoest
定期的	ていきてき	regular	regelmatig
心臓	しんぞう	heart	hart
忘れ物	わすれもの	something forgotten	verloren voorwerp
救急	きゅうきゅう	emergency	spoedeisende hulp
松葉杖	まつばづえ	crutch	kruk
注射	ちゅうしゃ	shots;injection;injections;shot;needles	
痒み	かゆみ	itch	jeuk
痛み	いたみ	pain	pijn
確認中		confirming	
肺炎	はいえん	pneumonia	longontsteking
血液	けつえき	blood	bloed
診察	しんさつ	examination	
車椅子	くるまいす	wheelchair	rolstoel
骨折	こっせつ	fractured;fracturing;fracture	
#264	voting	voting	Voting: Explain your decision	Verkiezing: Omschrijf hoofdpunten
あるいは	=	perhaps;maybe;or;may	
いずれ	=	eventually	ooit
ただし	=	however;provided that;but;note;except;except that	
にすぎない	=	is nothing more than;are nothing more than	
のもとで	=	under;beneath;in the care of;under the auspices of;under the guidance of;under the influence of	onder;onder leiding van;onder invloed van;onder de hoede van;onder toezicht van;onder begeleiding van
不利	ふり	disadvantage	nadeel
主要	しゅよう	main	belangrijk
令和	れいわ	Reiwa era 2019-present;reiwa	Reiwa;tijdperk Reiwa;era Reiwa;jaartelling Reiwa
判断	はんだん	judgement;decisions;decision;judgements	oordeel;beslissing;beoordeling;inschatting;besluiten
反対	はんたい	opposition	oppositie
地方	ちほう	region	regio
建設的	けんせつてき	constructive	constructief
当選	とうせん	election;winning;being elected;success;victory	
慎重に		carefully	voorzichtig
投票所	とうひょうしょ	polling station	stembureau
投票率	とうひょうりつ	voter turnout	opkomstpercentage
民主的	みんしゅてき	democratic	democratisch
決定	けってい	decisions;decision	
票	ひょう	vote;votes	stem;biljet;kaartje;ticket;stembiljet
自治体	じちたい	local government	gemeente
証明	しょうめい	proof	bewijs;certificaat;attest;bevestiging;demonstratie;aantonen;bewijzen
過半数	かはんすう	majority	meerderheid
#265	historic figures	historic figures	Legends: Describe a legendary figure	Erfgoed: Vertel over erfgoed
にしては	=	for	voor een;voor iemand die;voor iets dat;voor;gezien;in vergelijking met;ondanks
伝説的	でんせつてき	legendary	legendarisch
偉大	いだい	great	
共和国	きょうわこく	republic	republiek
刃物	はもの	bladed tool	scherp gereedschap
勇敢	ゆうかん	brave	dapper
哲学	てつがく	philosophy	filosofie
大使	たいし	ambassador	ambassadeur
学者	がくしゃ	scholar	geleerde
忠実	ちゅうじつ	loyal	trouw
時代	じだい	era	tijdperk
最終的に	さいしゅうてきに	ultimately	uiteindelijk
皇帝	こうてい	emperor	keizer
神話	しんわ	myth	legendes
進歩的	しんぽてき	progressive	progressief
遺産	いさん	heritage	erfgoed
野心的	やしんてき	ambitious	ambitieus
鉱物	こうぶつ	mineral	mineraal
#266	cooking 3	cooking 3	Dishes: Describe how to make a dish	Keuken: Vertel wat je nodig hebt
かぼちゃ	=	pumpkin	pompoen
たて	=	shield;shields	
にんにく	=	garlic	knoflook
ねぎ	=	green onion	lente-ui
ほうれん草	ほうれんそう	spinach	spinazie
わさび	=	wasabi	wasabi
コンロ	=	stove	fornuis
冷凍庫	れいとうこ	freezer	vriezer
味噌	みそ	miso	miso
消費期限	しょうひきげん	expiration date	
炊飯器	すいはんき	rice cooker	rijstkoker
胡椒	こしょう	pepper	peper
酢	す	vinegar	azijn
醤油	しょうゆ	soy sauce	sojasaus
鶏肉	とりにく	chicken	kippenvlees
麺	めん	noodle	noedel
#267	exercise routines 2	exercise routines 2	Exercise: Describe your exercise routine	Gezondheid: Deel je sportroutine
さ	=	you know	hè?
たっぷり	=	plenty	ruimschoots
サイクリング	=	cycling	fietsen
下ろします	おろします	I withdraw	
休憩	きゅうけい	rest	pauze
回数	かいすう	frequency	aantal keren
無理に		forcefully	gedwongen
程度	ていど	degree	mate
筋力	きんりょく	muscle strength	spierkracht
縄跳び	なわとび	jumping rope	touwtje springen
老後	ろうご	retirement	oude dag
肘	ひじ	elbow	elleboog
跳びます	とびます	jump;jumps	
鍛えます	きたえます	train	
#268	restaurant 2	restaurant 2	Restaurants: Book a table	Restaurant: Reserveer een tafel
しっとり	=	moist	vochtig
キャンセル料	キャンセルりょう	cancellation fee	annuleringskosten
グルテンフリー	=	gluten-free	glutenvrij
ジューシー	=	juicy	sappig
ラストオーダー	=	last order	laatste bestelling
予約制	よやくせい	reservation system	reserveringssysteem
何名様		how many people	hoeveel personen
個室	こしつ	private room	privékamer
割り勘	わりかん	going Dutch	gedeelde rekening
勧めます	すすめます	offers;offer;I recommend;encourage	
品切れ	しなぎれ	out of stock	uitverkocht
大盛り	おおもり	large serving	grote portie
小麦	こむぎ	wheat	tarwe
抜きで		without	zonder
満席	まんせき	full	volgeboekt
空席	くうせき	available seat	vrije plaats
辛口	からくち	spicy	pittig
食感	しょっかん	texture	textuur
鮭	さけ	salmon	zalm
#269	conflict resolution	conflict resolution	Opinions: Share your opinion	Standpunt: Geef je mening over gedrag
あいにく	=	unfortunately	helaas
に対して	にたいして	towards	tegenover;tegen;jegens;ten opzichte van;met betrekking tot;naar
に対する	にたいする	toward	ten opzichte van
もしよろしければ	=	If you don’t mind	Als u het goed vindt
事実	じじつ	fact	feit
委員会	いいんかい	committee	commissie
尊重	そんちょう	respect for	
感情的	かんじょうてき	emotional	emotioneel
文脈	ぶんみゃく	context	context
期待	きたい	my expectations	
観点	かんてん	point of view	zichtpunt
#270	social media 2	social media 2	Social Media: Describe online habits	Internet: Beschrijf online ergernissen
よかったら	=	if you like	als je wilt
コミュニティー	=	community	community
スパム	=	spam	spam
セキュリティー	=	security	beveiliging
タグ	=	tag	tag
パクリ	=	plagiarism	plagiaat
フォロー	=	follow;follow up;support;assistance;backing	Volg;volg
ブラウザー	=	browser	browser
プロフィール	=	profile	profiel
一瞬	いっしゅん	for a second	een moment
投稿します	とうこうします	posts	
欧米	おうべい	the West	westerse landen
炎上	えんじょう	blaze;fire;burning;flaming;catching fire;burning down;controversy;scandal;online backlash;flare up	ophef;brand
画像	がぞう	image	afbeelding
視聴回数		view count	aantal weergaven
#271	ethical shopping	ethical shopping	Products: Compare product features	Producten: Vergelijk producten
からといって	=	just because	alleen omdat
どのくらい	=	how much	hoe veel
レジ袋	レジぶくろ	plastic bag	plastic tas
使い捨て	つかいすて	disposable	wegwerp
保証期間	ほしょうきかん	warranty period	garantieperiode
修理	しゅうり	repairs;repair	reparatie;herstellen;repareren
偽物	にせもの	counterfeit	nep product
労働者	ろうどうしゃ	worker	arbeider
匂い	におい	smell	geur
原材料	げんざいりょう	raw materials;ingredients;materials;raw ingredients	grondstof
手頃	てごろ	reasonable	betaalbaar
期間限定	きかんげんてい	limited-time	tijdelijk
産地	さんち	place of origin	herkomst
皮	かわ	leather	huid
評判	ひょうばん	reputation	reputatie
詰め替え	つめかえ	refill	navulverpakking
鞄	かばん	bag	tas
食中毒	しょくちゅうどく	food poisoning	voedselvergiftiging
#272	post office	post office	Delivery: Ask about delivery options	Post: Vraag naar verzendkosten
お釣り	おつり	change	wisselgeld
ことができます	=	is able to;can	
はかり	=	scale	weegschaal
再配達	さいはいたつ	redelivery	herbezorging
包装	ほうそう	packaging	verpakking
受け取り	うけとり	receipt;receiving;acceptance;reception;collection	ontvangst;ontvangen;ontvangst nemen
国際郵便	こくさいゆうびん	international mail	internationale post
姓名	せいめい	full name	volledige naam
宅配便	たくはいびん	courier service	pakketbezorging
封筒	ふうとう	envelope	envelop
後払い	あとばらい	postpayment	achteraf betalen
段ボール	だんボール	cardboard	
液体	えきたい	liquid	vloeistof
直径	ちょっけい	diameter	diameter
着払い	ちゃくばらい	cash on delivery	rembours
貴重品	きちょうひん	your valuables;my valuables	waardevolle spullen
追跡番号	ついせきばんごう	tracking number	
郵便番号	ゆうびんばんごう	postal code	postcode
配達	はいたつ	delivery;delivering;deliveries	
配達員	はいたついん	delivery person	bezorger
重量	じゅうりょう	weight	gewicht
#273	pop culture	pop culture	Pop Stars: Describe a pop star	Popcultuur: Beschrijf een idool
っていうか	=	I mean	of beter gezegd
アイドル	=	idol	idool
インフルエンサー	=	influencer	influencer
クリエイター	=	creator	maker
コスプレ	=	cosplay	cosplay
コンテンツ	=	content	inhoud
ライブ	=	live concert	live
世代	せだい	generation	generatie
再生回数	さいせいかいすう	number of views	
吸血鬼	きゅうけつき	vampire	vampier
声優	せいゆう	voice actor	stemacteur
歌詞	かし	lyric	songtekst
殺す	ころす	kill;kills	
演奏	えんそう	musical performance;performance	
漫画	まんが	manga	manga
独特	どくとく	unique	uniek
脚本	きゃくほん	script	script
長崎	ながさき	Nagasaki	
限定	げんてい	limited edition	beperkte editie
馬	うま	horse	paard
魅力的	みりょくてき	attractive	aantrekkelijk
#274	cross-cultural communication	cross-cultural communication	Etiquette: Describe polite behavior	Omgang: Vertel over cultuurverschillen
ことわざ	=	proverb	spreekwoord
もよろしいでしょうか	=	May I	
上下関係	じょうげかんけい	hierarchical relationship	
保守的	ほしゅてき	conservative	conservatief
口調	くちょう	tone	toon
咳払い	せきばらい	clearing of throat	kuchen
失礼	しつれい	rude	onbeleefdheid;onfatsoenlijkheid;onbeleefd;onbeleefd gedrag;onbeleefde handeling;excuseer;pardon;sorry;neem me niet kwalijk
姿勢	しせい	posture	houding
握手	あくしゅ	handshake	handdruk
本音	ほんね	true feelings	ware gevoelens
株	かぶ	stock	aandeel
異文化	いぶんか	different culture	
自己紹介	じこしょうかい	self-introduction	zelfintroductie
表情	ひょうじょう	facial expression	gezichtsuitdrukking
遠慮	えんりょ	hesitation;restraint	terughoudendheid;reserve;schroom;aarzeling;beleefdheid;terughoudend zijn
#275	divorce	divorce	Relationships: Talk about family updates	Relaties: Vertel over familieveranderingen
だろう	=	are going to;is;must be;will;d;likely;I wonder;probably;is going to;would;ll	zal
カウンセリング	=	counseling	counseling
一方的に		in a one-sided manner	eenzijdig
保育園	ほいくえん	nursery school	kinderopvang
再婚	さいこん	remarriage	hertrouwen
冷静に		calmly	kalm
支援センター		support center	ondersteuningscentrum
故郷	ふるさと	hometown	thuisland
昇進します	しょうしんします	promoted	
浮気	うわき	infidelity	ontrouw
相性	あいしょう	compatibility	compatibiliteit
義理の		in-law	schoon-
財産	ざいさん	property	bezit
遠距離	えんきょり	long-distance	langeafstand
#276	literature 2	literature 2	Books: Recommend a book	Verhalen: Vertel over een boek
クライマックス	=	climax	climax
ベストセラー	=	bestseller	bestseller
一人称	いちにんしょう	first-person	eerste persoon
主人公	しゅじんこう	main character	hoofdpersoon
出版します	しゅっぱんします	is releasing	
印刷	いんさつ	print;prints	drukken;afdruk;printen;afdrukken
台詞	せりふ	line	
未来	みらい	future	toekomst
深い	ふかい	deep;profound;wasn't	diep;intens;grondig;diepgaand;sterk
版	はん	edition	editie
物語	ものがたり	story	verhaal
現代的	げんだいてき	modern	modern
簡潔	かんけつ	concise	beknopt
脇役	わきやく	supporting role	bijrol
表紙	ひょうし	cover	omslag
読書	どくしょ	reading	lezen
雰囲気	ふんいき	atmosphere	sfeer
#277	organizing an event	organizing an event	Plans: Ask about meeting times	Planning: Stel een evenement voor
テーブル席	テーブルせき	table seat	tafelplaats
ビジネスカジュアル	=	business casual	business casual
仮に	かりに	supposing	stel
叔父	おじ	uncle	oom
号室	ごうしつ	room number	kamer
屋敷	やしき	mansion	landhuis
来週末		next weekend	volgend weekend
桜	さくら	cherry blossom	kersenbloesem
翌日	よくじつ	next day	volgende dag
都合が悪い	つごうがわるい	inconvenient;not convenient;I cannot go	
騒がしい	さわがしい	noisy	levendig;overlastgevend;druk;rumoerig;lawaaierig;onrustig;woelig
#278	artificial intelligence	artificial intelligence	Systems: Present your team’s system	Systeem: Leg een systeem uit
セキュリティ	=	security	beveiliging
センサー	=	sensor	sensor
個人情報	こじんじょうほう	personal information	persoonlijke informatie
即座に	そくざに	immediately	onmiddellijk
多少	たしょう	somewhat	enigszins
学習	がくしゅう	learning	
実験	じっけん	an experiment;experiments;the experiment	
影響	えいきょう	influence;effect;effects	invloed;impact;effect;uitwerking;invloedssfeer
志望者	しぼうしゃ	applicant	kandidaat
改善します	かいぜんします	improves	
検索	けんさく	search	
#279	living abroad	living abroad	Work Life: Describe your new job	Wonen: Vertel over je nieuwe huis
たとえ	=	if	
というより	=	rather than	eerder dan
不動産	ふどうさん	real estate	onroerend goed
乾燥機	かんそうき	dryer	droger
交流	こうりゅう	interaction	uitwisseling
仕送り	しおくり	remittance	geldzending
免許	めんきょ	license	vergunning
契約社員	けいやくしゃいん	contract employee	tijdelijk werknemer
就職	しゅうしょく	finding a job;find a job	
延長	えんちょう	extend;extended	
手取り	てとり	net income	netto-inkomen
提出	ていしゅつ	submit;submitted	
方言	ほうげん	dialect	dialect
正社員	せいしゃいん	full-time employee	vaste werknemer
残業	ざんぎょう	working overtime;overtime	overwerk;overuren;extra werkuren
申し出	もうしで	offer	
間取り	まどり	layout	indeling
電柱	でんちゅう	utility pole	elektriciteitspaal
駐輪場	ちゅうりんじょう	bicycle parking lot	fietsenstalling
#280	sustainability 2	sustainability 2	Nature: Suggest ways to save resources	Natuur: Leg uit hoe je water spaart
かぎり	=	as long as	zolang
交通手段	こうつうしゅだん	means of transportation	vervoermiddel
利用します	りようします	use;utilize;uses;utilizes	
参加費	さんかひ	participation fee	deelnamekosten
寄付	きふ	donations;contributions;contribution;donation	bijdrage;donatie;schenking;gift;contributie
徹底的に		thoroughly	grondig
混雑	こんざつ	crowding	drukte
熊	くま	bear	beer
竹林	ちくりん	bamboo grove	bamboebos
訪れます	おとずれます	visits	
貴重	きちょう	valuable	waardevol
野生動物	やせいどうぶつ	wildlife	wilde dieren
#281	disabilities	disabilities	Access: Request sign language help	Toegankelijk: Vraag om een gangpadplek
スロープ	=	ramp	hellingbaan
バリアフリー	=	barrier-free	
充分に		enough	voldoende
効果的に		effectively	effectief
取り組み	とりくみ	initiative	aanpak
合法的	ごうほうてき	legal	legaal
多様	たよう	diverse	divers
多目的トイレ	たもくてきトイレ	accessible restroom	
字幕	じまく	subtitle	ondertiteling
平等	びょうどう	equal	gelijkheid
必要性	ひつようせい	necessity	noodzaak
手すり	てすり	railing	leuning
手話	しゅわ	sign language	gebarentaal
斜め	ななめ	slope	schuin
盲導犬	もうどうけん	guide dog	geleidehond
相談	そうだん	consult	raadpleging;consultatie;overleg;bespreking;advies;rade
自立	じりつ	independence;self-reliance;autonomy;self-support;self-sufficiency;independent living	zelfstandigheid;onafhankelijkheid;zelfredzaamheid;autonomie
補聴器	ほちょうき	hearing aid	hoortoestel
通路側	つうろがわ	aisle seat	gangplaats
音声ガイド	おんせいガイド	audio guide	audiogids
#282	driving	driving	Driving: Talk about hills and slopes	Verkeer: Vertel over verkeerssituaties
ウィンカー	=	turn signal	knipperlicht
エンジン	=	engine	motor
ガソリンスタンド	=	gas station	tankstation
クラクション	=	horn	claxon
サービスエリア	=	service area	rustplaats
ブレーキ	=	brake	rem
ペダル	=	pedal	pedaal
ルームミラー	=	rearview mirror	achteruitkijkspiegel
一方通行	いっぽうつうこう	one-way	eenrichtingsverkeer
上り坂	のぼりざか	uphill slope	helling
上旬	じょうじゅん	early part of the month	begin van de maand
免許証	めんきょしょう	driver's license	rijbewijs
死角	しかく	blind spot	dode hoek
満タン	まんタン	full tank	volle tank
燃費	ねんぴ	fuel efficiency	brandstofverbruik;verbruik;brandstofefficiëntie
速度制限	そくどせいげん	speed limit	snelheidslimiet
進路変更	しんろへんこう	lane change	baanwissel
#283	empathy	empathy	Feelings: Talk about similarities	Gevoel: Vertel wat je voelt
お互いに	おたがいに	mutually	elkaar
きちんと	=	properly	netjes;ordelijk;correct;precies;zorgvuldig;fatsoenlijk;keurig
にとって	=	to;for	voor;ten aanzien van;vanuit het oogpunt van
不満	ふまん	dissatisfaction	ontevredenheid
人柄	ひとがら	personality	karakter
伯母	おば	aunt	tante
兎	うさぎ	rabbit	konijn
共通点	きょうつうてん	common point	overeenkomst
同情	どうじょう	my sympathy	
孤独	こどく	loneliness	eenzaamheid
微妙	びみょう	delicate	subtiel
意識的に		consciously	bewust
推測します	すいそくします	assumes	
正直	しょうじき	honest;honesty	eerlijk
無意識に		unconsciously	onbewust
眼鏡	めがね	glasses	bril
納得	なっとく	consent;understanding;agreement;acceptance;approval;realization;comprehension	
自然に		naturally	natuurlijk
#284	money management	money management	Money: Talk about living costs	Financiën: Vraag om bespaartips
キャッシュレス	=	cashless	cashless
中期	ちゅうき	mid-term	middellange termijn
交通費	こうつうひ	transportation expense	reiskost
借金	しゃっきん	debt	schuld
光熱費	こうねつひ	utility bill	
全て	すべて	all	alle
前払い	まえばらい	prepayment	vooruitbetaling
医療費	いりょうひ	medical expense	medische kosten
合計	ごうけい	total	totaal
平均	へいきん	average	gemiddelde;gemiddeld;mediaan;norm;standaard
教育費	きょういくひ	education expense	onderwijskosten
消費税	しょうひぜい	consumption tax	consumptiebelasting
無駄遣い	むだづかい	wasteful spending	onnodige uitgaven
生活水準	せいかつすいじゅん	standard of living	levensstandaard
短期	たんき	short term	korte termijn
範囲	はんい	range	reikwijdte
経済的	けいざいてき	economical	economisch
返金	へんきん	refund	terugbetaling
通信費	つうしんひ	communication cost	communicatiekosten
#285	risks	risks	Disaster: Describe a disaster	Noodweer: Beschrijf hevig noodweer
山火事	やまかじ	wildfire	bosbrand
故障	こしょう	breakdown	storing
温暖化	おんだんか	global warming	opwarming
潮	しお	tide	getij
猿	さる	monkey	aap
確率	かくりつ	probability	kans
糸	いと	thread	draad
羊	ひつじ	sheep	schaap
避難	ひなん	evacuation	evacuatie
鋼鉄	こうてつ	steel	staal
雷	かみなり	thunder	donder
震度	しんど	seismic intensity	intensiteit
#286	language learning	language learning	Language: Ask about pronunciation	Taal: Leg basisregels uit
なまり	=	accent	accent
ひらがな	=	hiragana	hiragana
わりに	=	considering	voor de omstandigheden
カタカナ	=	katakana	katakana
ネイティブ	=	native speaker	native speaker
バイリンガル	=	bilingual	tweetalig
不自然	ふしぜん	unnatural	onnatuurlijk
予習	よしゅう	preparation	
仕組み	しくみ	mechanism	structuur
例文	れいぶん	example sentence	voorbeeldzin
基礎	きそ	basics	basis
外来語	がいらいご	loanword	geleend woord
大まか	おおまか	general	globaal
文字	もじ	character	teken
母語	ぼご	mother tongue	moedertaal
流暢	りゅうちょう	fluent	vloeiend
直感	ちょっかん	intuition	intuïtie
縦書き	たてがき	vertical writing	verticaal schrijven
言語交換	げんごこうかん	language exchange	taaluitwisseling
記憶	きおく	memory	geheugen
語彙力	ごいりょく	vocabulary	woordenschat
#287	gender orientation	gender orientation	Diversity: Talk about discrimination	Gelijkheid: Leg gelijkheid uit
ゲイ	=	gay	homoseksueel
ジェンダー	=	gender	gender
トランスジェンダー	=	transgender	transgender
バイセクシュアル	=	bisexual	biseksueel
レズビアン	=	lesbian	lesbienne
不利益	ふりえき	disadvantageous	nadelig
不平等	ふびょうどう	inequality	ongelijkheid
人種	じんしゅ	race	ras
保障	ほしょう	guarantee	garantie
偏見	へんけん	prejudice	vooroordeel
共有	きょうゆう	shared;sharing	delen;gedeeld;gezamenlijk;gemeenschappelijk;gezamenlijk gebruik
同性婚	どうせいこん	same-sex marriage	
否定	ひてい	denial;negation;rejection;refusal;contradiction	
多様性	たようせい	diversity	diversiteit
差別	さべつ	discrimination	discriminatie
支援	しえん	help;support	
日常生活	にちじょうせいかつ	daily life	dagelijks leven
社会問題	しゃかいもんだい	social issue	maatschappelijke probleem
配慮	はいりょ	consideration;concern;thoughtfulness;care;attention	
#288	global trade	global trade	Markets: Describe different markets	Handel: Vergelijk markten wereldwijd
しかし	=	however;but	maar;echter;doch;toch;evenwel
不景気	ふけいき	recession	recessie
交渉	こうしょう	negotiation;negotiations;negotiate	
価格	かかく	price	prijs
保険	ほけん	insurance	verzekering
倉庫	そうこ	warehouse	magazijn
効率的に		efficiently	efficiënt
国際的	こくさいてき	international	internationaal
市場	いちば	market	markt
支払い	しはらい	payment	betaling
柔軟	じゅうなん	flexible	flexibel
税関	ぜいかん	customs	douane
積極的に		actively	actief
競争	きょうそう	competition	concurrentie
見積もり	みつもり	estimate;quotation;assessment;appraisal;evaluation	
輸出	ゆしゅつ	export;exports	
#289	rural life 2	rural life 2	Countryside: Describe country life	Dorp: Vertel over het dorpsleven
お爺さん	おじいさん	grandfather	opa
インフラ	=	infrastructure	infrastructuur
トラクター	=	tractor	tractor
下水道	げすいどう	sewer system	riolering
低価格	ていかかく	low price	lage prijs
基本的に	きほんてきに	basically	in principe
役場	やくば	town hall	gemeentehuis
暮らし	くらし	life	leven
現金のみ		cash only	alleen contant
空き家	あきや	vacant house	leegstaand huis
絶景	ぜっけい	breathtaking view	adembenemend uitzicht
肥料	ひりょう	fertilizer	mest
蚊	か	mosquito	mug
軽トラック	けいトラック	mini truck	lichte vrachtwagen
農村	のうそん	countryside	platteland
農薬	のうやく	pesticide	pesticide
近道	ちかみち	shortcut	kortere weg
運転免許	うんてんめんきょ	driver's license	rijbewijs
鹿	しか	deer	hert
#290	the hard sciences	the hard sciences	Science: Explain research findings	Natuur: Beschrijf dieren in de natuur
dna		DNA	dna
そのため	=	therefore	daarom
一般的に		generally	over het algemeen
位置	いち	location	positie
光年	こうねん	light year	lichtjaar
分析	ぶんせき	analysis;analyses	
化石	かせき	fossil	fossiel
圧力	あつりょく	pressure	druk
次元	じげん	dimension	dimensie
温度計	おんどけい	thermometer	thermometer
火山	かざん	volcano	vulkaan
神経	しんけい	nerve	zenuw
空間	くうかん	space	ruimte
羽根	はね	wing	vleugel
衛星	えいせい	satellite	satelliet
貝類	かいるい	shellfish	schelpdier
速度	そくど	speed	snelheid
適応	てきおう	adaptation;adapt;adjustment;accommodation;conformity;compliance	aanpassing;adaptatie;aanpassen;zich aanpassen
重力	じゅうりょく	gravity	zwaartekracht
#291	music 2	music 2	Music: Describe a song	Muziek: Beschrijf een liedje
もしくは	=	or;otherwise;alternatively	of;dan wel;ofwel
サンバ	=	samba	samba
ジャンル	=	genre	genre
テンポ	=	tempo	tempo
デュエット	=	duet	duet
ヒップホップ	=	hip-hop	hiphop
ブルース	=	blues	blues
ボーカル	=	vocal	vocalen
レゲエ	=	reggae	reggae
印象的	いんしょうてき	impressive	indrukwekkend
叫びます	さけびます	screams;shouts;yell	
合唱	がっしょう	choir	koor
楽器	がっき	musical instrument	instrument
流行	りゅうこう	trend	mode
脳内	のうない	in the brain	in de hersenen
#292	customer service 2	customer service 2	Service: Explain store hours	Winkel: Geef informatie aan klanten
ご注意ください	ごちゅういください	attention;please	
サポート	=	support;assistance;help;backing;aid;guidance	ondersteuning;hulp;steun;support;bijstand;assistentie
一粒	ひとつぶ	grain	een korrel
丁寧に		politely and carefully	
依頼	いらい	request	verzoek
係員	かかりいん	staff member	medewerker
営業時間	えいぎょうじかん	business hours	
変更	へんこう	change;reschedule	aanpassing;wijziging;wijzig;verandering;modificatie;veranderingen
定休日	ていきゅうび	regular holiday	gesloten dag
対処	たいしょ	dealing	aanpak;aanpakken;behandeling;omgaan met;afhandeling;oplossing
対策	たいさく	measure	maatregel
店舗	てんぽ	store	winkel
指示	しじ	instructed;directions;the direction;instructions;orders;order;advice;prompts	instructie;aanwijzing;richtlijn;commando;indicatie;opdracht;bevel
敬語	けいご	honorific language	beleefde taal
案内	あんない	information	informatie
機能	きのう	function	functie
次第	しだい	depending on;as soon as;order;circumstances;situation;priority;sequence;immediately;gradually;in due course;it depends	afhankelijk van;zodra;volgorde;situatie;omstandigheden
特典	とくてん	benefit	voordeel
発送	はっそう	shipping;dispatch;shipment;sending;delivery	verzending;expeditie
矢印	やじるし	arrow	pijl
確実に		surely	zeker
送料	そうりょう	shipping cost	verzendkosten
#293	friendship	friendship	Personality: Describe a friend's personality	Vriendschap: Leg uit wat een vriend doet
いざとなると	=	when it comes to the crunch;when push comes to shove;in an emergency;when the time comes;when it really matters;when it really counts;when it comes down to it	als het erop aankomt
ぎこちない	=	awkward;clumsy;stiff;unnatural;uneasy;hesitant;uncomfortable	onhandig;ongemakkelijk;houterig;stijf;onbeholpen;onwennig
わりと	=	relatively	relatief
些細	ささい	trivial	klein;onbeduidend;gering;onbelangrijk;triviaal
内向的	ないこうてき	reserved	introvert
初対面	しょたいめん	first meeting	eerste ontmoeting
嫉妬	しっと	jealousy	jaloezie
意識	いしき	awareness	bewustzijn
社交的	しゃこうてき	social	sociaal
第一印象	だいいちいんしょう	first impression	eerste indruk
表現	ひょうげん	expression;phrase;aspects	uitdrukking;expressie;voorstelling;weergave;formulering;verwoorden
遠慮なく	えんりょなく	without hesitation	zonder aarzeling
開放的	かいほうてき	open-minded	open
頑固	がんこ	stubborn	koppig
#294	globalization	globalization	Economy: Discuss price differences	Markt: Leg uit waarom je iets kiest
一方で		on the other hand	aan de andere kant
人材	じんざい	talent	talent
労働力	ろうどうりょく	labor force	arbeidskracht
効率	こうりつ	efficiency	efficiëntie
報告	ほうこく	the report;a report;the reports	rapport;verslag;melding;bericht;rapportage
失業	しつぎょう	unemployment	werkloosheid
投資	とうし	investment	investering
気候変動	きこうへんどう	climate change	klimaatverandering
消費者	しょうひしゃ	consumer	consument
生産	せいさん	production;manufacturing	productie;vervaardiging;fabricage;aanmaak;opbrengst;produceren;maken
発展	はってん	development	ontwikkeling
競争力	きょうそうりょく	competitiveness	concurrentiekracht
翻訳	ほんやく	the translation;the translations;translate;a translation;translation	vertaling;vertalen
賃金	ちんぎん	wage	loon
通信	つうしん	communication	communicatie
#295	outer space	outer space	Space: Discuss a space launch	Ruimte: Leg uit wat je in de ruimte ziet
あらゆる	=	every	alle
クレーター	=	crater	krater
不可能	ふかのう	impossible	onmogelijk
太陽系	たいようけい	solar system	zonnestelsel
宇宙ステーション	うちゅうステーション	space station	ruimtevaartstation
宇宙船	うちゅうせん	spaceship	ruimteschip
宇宙飛行士	うちゅうひこうし	astronaut	astronaut
巨大	きょだい	huge	enorm
惑星	わくせい	planet	planeet
撮影	さつえい	photography	
映像	えいぞう	footage	beeld
望遠鏡	ぼうえんきょう	telescope	telescoop
木星	もくせい	Jupiter	
水星	すいせい	Mercury	
流星	りゅうせい	meteor	vallende ster
火星	かせい	Mars	
画質	がしつ	image quality	beeldkwaliteit
的確	てきかく	accurate	nauwkeurig
訓練	くんれん	training;practice;schooling	
豊富	ほうふ	abundant	rijk
金星	きんせい	Venus;planet	
#296	nature	nature	Weather: Share a weather update	Landschap: Beschrijf het landschap
噴火	ふんか	eruption	uitbarsting
地滑り	じすべり	landslide	aardverschuiving
岩	いわ	rock	rots
日光	にっこう	sunlight	zonlicht
昆虫	こんちゅう	insect	insect
温室効果	おんしつこうか	greenhouse effect	broeikaseffect
湿度	しつど	humidity	vochtigheid
滝	たき	waterfall	waterval
激しい	はげしい	intense;heavy;terrible;drastic;severe;violent	hartstochtelijke;onstuimig;woelig;stormachtig
砂浜	すなはま	sandy beach	zandstrand
穏やか	おだやか	calm	rustig
群れ	むれ	flock	troep
花粉	かふん	pollen	stuifmeel
草原	そうげん	grassland	grasland;steppe;prairie;weide;savanne;veld
葉	は	leaf	blad
豊か	ゆたか	rich	rijk
野生の		wild	wild
雲	くも	cloud	wolk
#297	crime	crime	Crime: Discuss crime prevention	Beveiliging: Beschrijf nieuwe camera’s
おわび	=	apology	verontschuldiging
アリバイ	=	alibi	alibi
インタビュー	=	interview	interview
リフォーム	=	renovation	renovatie
下町	したまち	downtown;old town;downtown area;lower town;downtown district;neighborhood;traditional district	
公開	こうかい	publicize	openbaarmaking;publicatie;openstelling;bekendmaking;vrijgave;vrijgeven;beschikbaar stellen
合法	ごうほう	legal	legaal
命令	めいれい	order	bevel
埼玉	さいたま	Saitama	
意義	いぎ	significance	betekenis
指紋	しもん	fingerprint	vingerafdruk
最寄り駅	もよりえき	nearest station	dichtstbijzijnde station
監視カメラ	かんしカメラ	surveillance camera	bewakingscamera
目撃者	もくげきしゃ	witness	getuige
落とし物	おとしもの	lost item	verloren voorwerp;gevonden voorwerp;verloren zaak;achtergelaten voorwerp
裁判	さいばん	trial	rechtszaak
裁判官	さいばんかん	judge	rechter
銃	じゅう	gun	wapen
長所	ちょうしょ	strength	pluspunt
防犯	ぼうはん	crime prevention	
#298	secondary school	secondary school	Classroom: Share exam study tips	Schooldag: Leg uit hoe je studeert
べき	=	should	moeten;behoren;horen;zouden moeten;zouden;dienen
めったに	=	rarely	zelden
修学旅行	しゅうがくりょこう	school trip	schoolreisje
優秀	ゆうしゅう	excellent	uitstekend
公立	こうりつ	public	openbaar
国語	こくご	Japanese language	Japans
当番	とうばん	duty person	wacht;dienstdoende persoon;dienst;beurt;taak;schoonmaakdienst
役員	やくいん	officer	bestuurslid
早退	そうたい	leaving early;early departure;leaving work early;leaving school early	eerder vertrekken;voortijdig vertrekken;vroegtijdig weggaan;eerder weggaan
時間割	じかんわり	timetable	rooster
理科	りか	science	natuurwetenschap
生徒会	せいとかい	student council	leerlingenraad
留年	りゅうねん	repeating a year	blijven zitten
私立	しりつ	private	particulier
職員室	しょくいんしつ	staff room	docentenkamer
補習	ほしゅう	supplementary lesson	bijles
課外活動	かがいかつどう	extracurricular activity	
黒板	こくばん	blackboard	schoolbord
#299	accidents	accidents	Accidents: Explain how to prevent falls	Veiligheid: Beschrijf onveilige situaties
たいした	=	significant	belangrijk
ぶつけます	=	hit	
アクセル	=	accelerator	gaspedaal
エアバッグ	=	airbag	airbag
ガス漏れ	ガスもれ	gas leak	gaslek
シートベルト	=	seatbelt	veiligheidsgordel
タイヤ	=	tire	band
ハンドル	=	steering wheel	stuurwiel
一時停止	いちじていし	stop	stop
交通事故	こうつうじこ	traffic accident	verkeersongeval
保険会社	ほけんがいしゃ	insurance company	verzekeringsmaatschappij
公共交通	こうきょうこうつう	public transportation	openbaar vervoer
土砂崩れ	どしゃくずれ	landslide	aardverschuiving
意図的に		intentionally	opzettelijk
接触	せっしょく	contact;touch;exposure;interaction;collision;bump	contact;aanraking;verbinding;aanraken;botsing
標識	ひょうしき	sign	bord;verkeersbord;teken;markering;aanwijzing;signaal
自己評価	じこひょうか	self-assessment	zelfevaluatie
落石	らくせき	falling rock	losliggende steen;rotsblok;vallende steen;steenval
軽傷	けいしょう	minor injury	lichte verwonding
通話	つうわ	call	oproep
酷い	ひどい	terrible;badly	verschrikkelijk;erg;ernstig;wreed;zwaar;slecht
#300	disaster preparedness	disaster preparedness	Camping: Describe useful gear	Kamperen: Leg uit wat je meeneemt
あらかじめ	=	in advance	van tevoren
グリル	=	grill	grill
スコップ	=	shovel	schep
トング	=	tong	tang
ノコギリ	=	saw	zaag
モバイルバッテリー	=	portable charger	powerbank
ランタン	=	lantern	lantaarn
充電します	じゅうでんします	charges	
包丁	ほうちょう	kitchen knife	keukenmes
包帯	ほうたい	bandage	verband
懐中電灯	かいちゅうでんとう	flashlight	zaklamp
消毒	しょうどく	disinfection;sterilization;antisepsis;sanitization;sterilizing;disinfecting;sanitize	desinfectie;ontsmetting;sterilisatie;ontsmetten
焚き火	たきび	campfire	kampvuur
網	あみ	net	net
虫よけスプレー		insect repellent spray	insectenspray
調味料	ちょうみりょう	seasoning	
軽量	けいりょう	lightweight	licht
頑丈	がんじょう	strong	stevig
食材	しょくざい	ingredient	ingrediënt
飲料水	いんりょうすい	drinking water	drinkwater
#301	romance	romance	Romance: Describe a romantic moment	Relatie: Vertel over je relatie
そっと	=	gently	zachtjes
もしかして	=	perhaps	misschien
プロポーズ	=	proposal;marriage proposal;propose;proposing	aanzoek;huwelijksaanzoek;voorstel;vraag
ロマンチック	=	romantic	romantisch
仲直り	なかなおり	reconciliation	verzoening
告白します	こくはくします	confessing	
外見	がいけん	appearance	uiterlijk
婚約	こんやく	engagement	verloving
安心感	あんしんかん	sense of security	
寛容	かんよう	tolerant	tolerant
尊敬	そんけい	respect	respect
恋人	こいびと	partner	liefste
情熱的	じょうねつてき	passionate	passioneel
愛	あい	love	liefde
揉め事	もめごと	conflict	ruzie
散歩	さんぽ	walks;a walk;walk	wandeling;wandeling maken
理想	りそう	ideal	ideaal
秘密	ひみつ	secret	geheim
背徳感	はいとくかん	guilt	schuldgevoel
花束	はなたば	bouquet	boeket
#302	community service	community service	Community: Describe community roles	Gemeente: Leg taken uit aan vrijwilligers
チラシ	=	flyer	folder
代表	だいひょう	representative	vertegenwoordiger
会費	かいひ	membership fee	lidmaatschapsgeld
住民	じゅうみん	resident	inwoner
公民館	こうみんかん	community center	gemeenschapscentrum
募金	ぼきん	fundraising	inzameling
底	そこ	bottom	bodem
当日	とうじつ	the day	de dag zelf
歩道	ほどう	sidewalk	voetpad
県庁	けんちょう	prefectural office;prefectural government office;prefecture office;prefectural government building;prefectural office building	provinciehuis;provinciebestuur;prefectuur;prefectuursgebouw;provinciegebouw;prefectuurkantoor
窓口	まどぐち	service desk	loket
管理人	かんりにん	caretaker	beheerder
餅	もち	mochi	mochi
高齢者	こうれいしゃ	elderly person	oudere
#303	bank 2	bank 2	Banking: Fill out bank forms	Bankzaken: Vul een bankformulier in
キャッシュカード	=	ATM card	pinpas
デビットカード	=	debit card	debetkaart
両替	りょうがえ	currency exchange	wisselen;geld wisselen;valuta omwisselen;geld omwisselen
休業日	きゅうぎょうび	closed day	sluitingsdag
利子	りし	interest	rente
取消	とりけし	cancellation;withdrawal;annulment;rescission	annuleren;intrekken;afzeggen;opheffen;schrappen
小切手	こぎって	check	cheque
担当者	たんとうしゃ	person in charge	verantwoordelijke
支店	してん	branch	filiaal
教育ローン		education loan	onderwijslening
暗証番号	あんしょうばんごう	PIN	pincode
有効期限	ゆうこうきげん	expiration date	vervaldatum
残高	ざんだか	balance	saldo
注意事項	ちゅういじこう	important notes	belangrijke informatie
硬貨	こうか	coin	munt
記入	きにゅう	fill in;in;fill out	invullen;inschrijven;noteren
記入します	きにゅうします	fill out	
身分証明書	みぶんしょうめいしょ	identification document	identiteitsbewijs
通帳	つうちょう	passbook	bankboekje
金額	きんがく	amount	bedrag
#304	digital communication	digital communication	Messages: Block unwanted messages	Bericht: Reageer op een nepbericht
の際		in the event of	bij
スタンプ	=	sticker	sticker;stempel;stickers
ビデオ会議	ビデオかいぎ	video conference	videoconferentie
ミュート	=	mute	stil zetten
リマインダー	=	reminder	herinnering
履歴	りれき	history	geschiedenis
日付	ひづけ	date	datum
更新	こうしん	update;updating;renewal;updates	bijwerken;vernieuwen;update;actualiseren;verlengen
迷惑メール	めいわくメール	spam mail	spam
迷惑行為	めいわくこうい	harassment	overlastgevend gedrag
通知	つうち	notification	melding
#305	history	history	Heritage: Describe historical places	Geschiedenis: Leg een legende uit
世界遺産	せかいいさん	World Heritage Site	werelderfgoed
世紀	せいき	century	eeuw
伝記	でんき	biography	biografie
伝説	でんせつ	legend	legende
信仰	しんこう	faith	geloof
国境	こっきょう	border	grens
天皇	てんのう	emperor	tenno
憲法	けんぽう	constitution	grondwet
政権	せいけん	regime	regime
文明	ぶんめい	civilization	beschaving
明治	めいじ	Meiji;Meiji era;Meiji period;Meiji times;Meiji time	Meiji;Meiji-periode;Meiji-tijdperk;tijd;periode;tijdperk
歴史的	れきしてき	historical	historisch
江戸時代	えどじだい	Edo period	Edo-periode
王国	おうこく	kingdom	koninkrijk
現代	げんだい	present	de moderne tijd
職人	しょくにん	craftsman	ambachtsman
象徴	しょうちょう	symbol	symbool
遺跡	いせき	ruins	ruïne
#306	immigration	immigration	Scholarship: Describe common challenges	Toelating: Deel je zorgen over toelating
その結果	そのけっか	as a result	als gevolg daarvan
ところが	=	however;but;on the other hand;nevertheless;yet;even so	echter;maar;toch;desalniettemin;nochtans
不安定	ふあんてい	unstable	onstabiel
住宅	じゅうたく	housing	woning
保育	ほいく	childcare	opvang
保護	ほご	protection;preserving	bewaring;beschermen;bescherming;behoeding;opvang;bescherming bieden;geborgenheid
傾向	けいこう	trend	trend
労働時間	ろうどうじかん	working hours	arbeidstijd
同居	どうきょ	cohabitation;living together;living with someone;co-residence	samenwonen;samenleven;samenwoning;cohabitatie
国籍	こくせき	nationality	nationaliteit
在留カード	ざいりゅうカード	residence card	verblijfskaart
奨学金	しょうがくきん	scholarship	beurs
学生ビザ	がくせいビザ	student visa	studentenvisum
学費	がくひ	tuition	collegegeld
希望者	きぼうしゃ	applicant	kandidaat
帰国	きこく	return to one's country;repatriation;homecoming	repatriëring;terugkeer naar het vaderland;terugkeer naar huis;vertrek naar huis;terugkeer naar het thuisland;thuisland
弁護士	べんごし	lawyer	advocaat
政策	せいさく	policy	beleid
滞在	たいざい	visits;stay	verblijf;verblijfplaats;verblijfperiode;logies;verblijf houden;verblijven
移民	いみん	immigrant	immigrant
#307	technology	technology	Devices: Describe a device problem	Apparaat: Omschrijf wat niet werkt
お気に入り	おきにいり	favorite	favoriet
で大丈夫		is okay	oké zijn
ディスプレイ	=	display	display
不具合	ふぐあい	malfunction	storing
充電器	じゅうでんき	charger	oplader
別料金	べつりょうきん	extra charge	extra kosten
変換プラグ		adapter plug	adapter
定番	ていばん	classic	standaard
対象外	たいしょうがい	excluded	uitgesloten
設定します	せっていします	sets;will set;set	
順調	じゅんちょう	going well	goed
#308	activism	activism	Leaders: Share leaders’ messages	Groep: Deel ideeën met je groep
それでも	=	still	toch
ストライキ	=	strike	staking
ハッシュタグ	=	hashtag	hashtag
ボイコット	=	boycott	boycot;boycotten
公正	こうせい	fair	eerlijk
利用者	りようしゃ	user	gebruiker
制度	せいど	system	systeem
医療	いりょう	healthcare	gezondheidszorg
拡大	かくだい	expansion;enlargement;magnification;extension;amplification;spread	vergroting;uitbreiding;expansie;vergroten;uitbreiden
指導	しどう	guidance	begeleiding
支持	しじ	support	
支持者	しじしゃ	supporter	aanhanger
活動家	かつどうか	activist	activist
縮小	しゅくしょう	reduction;downsizing;contraction;scaling down;shrinking;cutback;decrease	verkleining;vermindering;inkrimping;reductie;krimp;krimpen;verkleinen
計画	けいかく	plan	plan
討論	とうろん	debate;discussion;argument;discourse;deliberation	discussie;debat;bespreking;overleg
議員	ぎいん	legislator	parlementslid
関東	かんとう	Kanto;Kanto region;Kanto area	Kanto-regio;Kanto-gebied;Kanto;kantō
#309	apologizing	apologizing	Refunds: Apologize for a wrong order	Klanten: Verwelkom een klant
いかがですか	=	How is it?	hoe vindt u
と申します		my name is...	
クレーム	=	complaint	klacht
小銭	こぜに	coin	kleingeld
意図的	いとてき	intentional	opzettelijk
払戻し	はらいもどし	refund	terugbetaling
抹茶	まっちゃ	matcha	matcha
様	よう	Mr.;Mrs.;Ms.;Miss	wijze;manier;stijl;vorm;heer;mevrouw;meneer;toestand;situatie;klant;gast
決して	けっして	never	nooit
番号札	ばんごうふだ	number ticket	nummerbriefje
負担	ふたん	burden	last
#310	food	food	Sushi Bar: Choose your seat	Eten: Kies een zitplaats
お好きな		your preferred	favoriete
お米	おこめ	rice	rijst
セルフレジ	=	self-checkout	zelfbedieningskassa
付き	つき	with	met
伝票	でんぴょう	bill	rekening
円札		yen bill	yenbiljet
券売機	けんばいき	ticket machine	kaartautomaat
単品	たんぴん	single item	item
喫煙席	きつえんせき	smoking section	rookgedeelte
回転寿司	かいてんずし	conveyor belt sushi	kaiten-zushi
奢り	おごり	treat	traktatie
抜群	ばつぐん	excellent	uitstekend
持ち帰り	もちかえり	takeout	
氷なしで		without ice	zonder ijs
漬物	つけもの	pickled vegetable	ingelegde groenten
甲殻類	こうかくるい	shellfish	
食券	しょっけん	meal ticket	etensticket`;
