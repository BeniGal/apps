function OPoint(x, y, color, ctx)	//Pont-osztály
{	this.x = x;						//Áll egy x,
	this.y = y;						//és egy y koordinátából
	this.color = color;				//Szín

	this.Draw = function()						//Kirajzolás
	{	ctx.beginPath();						//Kezdés
		ctx.arc(x, y, 1, 0, 2*Math.PI, false);	//Nagyon kicsi kör
		ctx.lineWidth = 2;						//Vastagság
		ctx.strokeStyle = color;				//Szín
		ctx.stroke();						//Rárajzol
	}
}

function OLine(A, B, color, width, rounded, ctx) {	//Vonal-osztály
	this.A = A;				//Két pont: A és
	this.B = B;				//B határozza meg
	this.color = color;		//Szín
	this.width = width;		//Vonalvastagság
	this.rounded = rounded;	//Kerekítés

	this.Draw = function() {			//Kirajzolás

		ctx.beginPath();					//Kezdés
		ctx.moveTo(A.x, A.y);				//Egyik ponthoz megy
		ctx.lineTo(B.x, B.y);				//Innen vonal a másikhoz
        if (rounded) ctx.lineCap='round';	//Kerekítés
		ctx.lineWidth=width;				//Vonalvastagság
        ctx.strokeStyle=color;				//Szín
		ctx.stroke();					//Rárajzol

	}
}

function OVector(A, mod, angle, color, width, rounded, ctx)		//Vektor-osztály
{	this.mod = mod;									//Moduló
	this.angle = angle;								//Szög
	this.A = A;										//Támadópont

	this.B = new OPoint(
		A.x + Math.cos(angle)*mod*30,				//B-nek x és
		A.y - Math.sin(angle)*mod*30,				//y távolsága A-tól
		ctx
	);

	//Három vonalból áll

	this.main = new OLine(							//Fővonal
		A, this.B, color, width, rounded, ctx
	);

	this.arrow1 = new OLine(						//Egyik nyílvonal
		this.B,										//B-től kezdődik
		new OPoint(
			this.B.x - Math.cos(angle-Math.PI/6)*mod*2/3,	//A vektorral való -30°-os bezárási szög esetén x
			this.B.y + Math.sin(angle-Math.PI/6)*mod*2/3	//és y távolság a B-től
		),
		color, width, rounded, ctx						//Szín, vastagság, kerekítés
	);
	this.arrow2=new OLine(							//Másik nyílvonal
		this.B,										//B-től kezdődik
		new OPoint(
			this.B.x - Math.cos(angle+Math.PI/6)*mod*2/3,	//A vektorral való +30°-os bezárási szög esetén x
			this.B.y + Math.sin(angle+Math.PI/6)*mod*2/3	//és y távolság a B-től
		),
		color, width, rounded, ctx					//Szín, vastagság, kerekítés
	);

	//Vektor-felbontás
	if (angle && angle!=Math.PI/2)					//Ha még nem egy felbontott vektor (nem vízszintes vagy függőleges),
	{	this.x = new OVector(							//akkor van neki felbontása: x,
			A, Math.cos(angle)*mod,
			0, color, width/2, rounded, ctx
		);
		this.y = new OVector(							//és y vektorok,
			A, Math.sin(angle)*mod,
			Math.PI/2, color, width/2, rounded, ctx		//félvastagsággal
		);
	}

	this.Draw = function()							//Kirajzolás
	{	this.main.Draw();							//Fővonal
		this.arrow1.Draw();							//1-es és
		this.arrow2.Draw();							//2-es nyílvonal
	}
}

function OShape(borderColor, fillColor, width, ctx) {	//Mindenféle alakzat főosztálya

	this.borderColor = borderColor;					//Keretszín
	this.fillColor = fillColor;						//Kitöltési szín
	this.width = width;								//Vonalvastagság

	this.SetToCanvas = function() {					//Vászonra feltevés

		ctx.lineWidth = width;						//Vonalvastagság

		if (fillColor)								//Ha van kitöltési szín,
		{	ctx.fillStyle = fillColor;				//akkor meghatározzuk
			ctx.fill();								//és is kitöltjük
		}

		ctx.strokeStyle = borderColor;				//Keretszín
		ctx.stroke();								//Keretrárajzolás
	}
}

function OAngularShape(borderColor, fillColor, rounded, width, ctx) {	//Szögletes (vonalakból álló, nem görbe) alakzatok osztálya

	this.prototype = new OShape(borderColor, fillColor, width, ctx);	//Ez egy alakzat
	this.rounded = rounded;												//Kerekítés

	this.SetToCanvas = function() {										//Vászonra feltevés

		if (rounded) ctx.lineJoin = 'round';							//Ha kerekített esetleg
		this.prototype.SetToCanvas();									//Örökölt vászonratevés
	}
}

function OTriangle(A, B, C, borderColor, fillColor, rounded, width, ctx) //Háromszögosztály
{	//Ez egy szögletes alakzat
	this.prototype = new OAngularShape(borderColor, fillColor, rounded, width, ctx);

	this.A = A;					//Három pont: A,
	this.B = B;					//B és
	this.C = C;					//C pontok

	this.Draw=function() {		//Kirajzolás

		ctx.beginPath();		//Kezdés
		ctx.moveTo(A.x, A.y);	//Egyik ponthoz megy
		ctx.lineTo(B.x, B.y);	//Innen vonal a másodikhoz
		ctx.lineTo(C.x, C.y);	//Majd a harmadikhoz
		ctx.closePath();		//S lezárja a harmadik vonallal
		this.prototype.SetToCanvas();	//Kiteszi
	}
}

//Lejtő
function OIncline(baseY, Ax, Bx, angle, borderColor, fillColor, rounded, width, ctx)
{	this.baseY = baseY;
	this.C = new OPoint(Ax, baseY-Math.tan(angle)*(Ax-Bx), ctx);
	this.prototype =
		new OTriangle(
			(new OPoint(Ax, baseY)),
			(new OPoint(Bx, baseY)),
			this.C, borderColor, fillColor, rounded, width, ctx
		);

	this.Draw = function(){ this.prototype.Draw()}
}

function OQuadrangle(A, B, C, D, borderColor, fillColor, rounded, width, ctx)
{	this.prototype = new OAngularShape(borderColor, fillColor, rounded, width, ctx);

	this.A = A;
	this.B = B;
	this.C = C;
	this.D = D;

	this.Draw = function()
	{	ctx.beginPath();
		ctx.moveTo(A.x, A.y);
		ctx.lineTo(B.x, B.y);
		ctx.lineTo(C.x, C.y);
		ctx.lineTo(D.x, D.y);
		ctx.closePath();
		this.prototype.SetToCanvas();
	}
}

//Testosztály
function OStuff(O, m, width, height, angle, borderColor, fillColor, rounded, lineWidth, ctx)
{	this.prototype = new OQuadrangle(					
		new OPoint(-width/2, -height/2),			//Négyszögletű;
		new OPoint(width/2, -height/2),				//sőt,
		new OPoint(width/2, height/2),				//téglalap
		new OPoint(-width/2, height/2),
		borderColor,fillColor,rounded,lineWidth);

	this.O = O;										//Súlypont (középpont)
	this.angle = angle;								//Elfordulási szöge

	this.v = new OVector(							//Sebességvektora
		new OPoint(400, 100),
		0, Math.PI + angle, '#000', 2, 1,
		ctx
	);

	//Súlya
	this.G = new OVector(O, g.mod*m, Math.PI*3/2, '#D22', 2, 1);
	//Tömege
	this.m = m;

	this.Draw = function()						//Kirajzolás
	{	ctx.translate(O.x, O.y);					//Elmegyünk a középponthoz
		ctx.rotate(-this.angle);					//Forgatjuk a vásznat
		this.prototype.Draw();						//Kirajzoljuk a négyszöget
		ctx.rotate(this.angle);						//Visszaforgatás
		ctx.translate(-O.x, -O.y);					//és az origóba menés
	}
	this.Gravity=function()						//Gravitáció hatása
	{	this.O.x += this.v.x.mod;					//Az x és
		this.O.y -= this.v.y.mod;					//y koordináták változása
		this.v = new OVector(
			new OPoint(400, 100),
			this.v.mod + g.mod * Math.sin(this.angle),	//Sebességváltozás
			Math.PI + angle, '#000', 2, 1
		);
		this.G = new OVector(O, g.mod*m, Math.PI*3/2, '#D22', 2, 1);
	}
}

//Körosztály (labda :P)
function OCircle(O, r, borderColor, fillColor, width, ctx)
{	this.prototype =
		//Nem szögeletes alakzat
		new OShape(borderColor, fillColor, width, ctx);

	this.O = O;										//Középpont
	this.r = r;										//Sugár

	this.Draw = function() {						//Kirajzolás

		ctx.beginPath();								//Kezdés
		ctx.arc(O.x, O.y, r, 0, 2 * Math.PI, false);	//Kör
		this.prototype.SetToCanvas();					//Kiteszi
	}
}