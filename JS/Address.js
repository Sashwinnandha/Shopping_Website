
class Address{
    constructor(door,building,Street,Area,city,pincode,state){
        this.door=door;
        this.building=building;
        this.Street=Street;
        this.Area=Area;
        this.city=city,
        this.pincode=pincode;
        this.state=state;
    }

    addressDetails(){
        return `<div class='mt-2'>Contact Us No. ${this.door}, ${this.building}, ${this.Street}, ${this.Area}, ${this.city}-${this.pincode}, ${this.state}</div>
        <div>Copyright &copy; UI & Markup Team, WebTech Limited</div>`;
    }
}

let Addr=new Address(261,"Issac Tower","Habbullah Road","T.Nagar","Chennai","600017","TamilNadu");

$(function(){
    $("footer").prepend(Addr.addressDetails())
})
