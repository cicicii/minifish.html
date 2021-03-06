var fruitobj=function(){
	this.alive=[];
	this.x=[];
	this.y=[];
	this.aneNO=[];
	this.l=[];
	this.spd=[];
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();

}

fruitobj.prototype.num = 30;
fruitobj.prototype.init=function(){
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNO[i]=0;
		this.spd[i]=Math.random()*0.018+0.002;	//	[0.002,0.02)
		this.fruitType[i]="";
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}
fruitobj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i])
		{
			if(this.fruitType[i]=="blue")
			{
				var pic=this.blue;
			}
			else
			{
				var pic=this.orange;
			}
			if(this.l[i]<=15)
			{
				var NO=this.aneNO[i];
				this.x[i]=ane.headx[NO];
				this.y[i]=ane.heady[NO];
				this.l[i]+=this.spd[i]*deltaTime;
				//ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]); 
			}
			else
			{
				this.y[i]-=this.spd[i]*7*deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10)
			{
				this.alive[i]=false;
			}
		}
		
	}
}

fruitobj.prototype.born=function(i){
	
	this.aneNO[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.25)
	{
		this.fruitType[i]="blue";
	}
	else
	{
		this.fruitType[i]="orange";
	}
	
}

fruitobj.prototype.dead=function(i){
	fruit.alive[i]=false;
}


function fruitMonitor(){
	var num=0;
	for(var i=1;i<fruit.num;i++){
		if(fruit.alive[i])	num++;
	}
	if(num<15)
	{
		sendfruit();
		return;
	}
}

function sendfruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}