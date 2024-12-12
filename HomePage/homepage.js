//html elements for booking an appointment
let btnOk = document.getElementById("okay");
let inputName = document.getElementById("First");
let inputSurname = document.getElementById("LastName");
let inputEmail = document.getElementById("EmailAddress");
let inputPhone = document.getElementById("PhoneNumber");
let selectService = document.getElementById("Services");
let selectDate = document.getElementById("date");
let Alertmsg = document.getElementById("alerttittle");
let Alertmsg2 = document.getElementById("alerttittle2");
let Alertbox = document.querySelector(".bookingalert");
let refNum = document.getElementById('refNum');
let eBody = document.body;


let bookings = [];
let inputs = [inputName, inputSurname, inputEmail,  inputPhone, selectService, selectDate];

class Customer{
    #_name;
    #_surname;
    #_emailAddress;
    #_service;
    #_date;
    static _alphaNumeric = '0123456789';

    constructor(name,surname, emailaddress, servicetype, date)
    {
        this.#_name = name;
        this.#_surname = surname;
        this.#_emailAddress = emailaddress;
        this.#_service = servicetype;
        this.#_date = date;
    };

    generateReference(){
        let reference = [];
        let intLength = (Customer._alphaNumeric).length;
        for(let i = 0; i<10; i++)
        {
            reference[i] = Customer._alphaNumeric[Math.floor(Math.random()*intLength)];
        }
        return 'N'+reference.join(''); //Join the reference array into a string and return it
    };
};

function sendBooking()
{
    let counter = 0;
    inputs.forEach(element =>  
        {
            if (element.value === '')
                {
                    counter++;
                };
        }
    );

    console.log(counter);
    eBody.style.overflow = 'hidden';

    if(counter>0)
    {
        Alertbox.style.display = 'flex';
        Alertmsg.textContent = '';
        refNum.textContent = '';
        Alertmsg2.textContent = "Please fill in all fields";
    }
    else
    {
        const newCustomer = new Customer(inputName.value, inputSurname.value, inputEmail.value,  inputPhone.value, selectService.value, selectDate.value)
        let ReferenceNum = newCustomer.generateReference();
        Alertbox.style.display = 'flex';
        refNum.textContent = ReferenceNum;
        Alertmsg.textContent = "Your booking was successful."; 
        Alertmsg2.textContent= "Your reference number is: ";
        bookings.push(newCustomer);
    };
};

function dismissAlert(){
    //remove all fields
        inputs.forEach(element =>  
        {
            element.value = '';
        }
    );
    Alertbox.style.display = '';
    eBody.style.overflow = '';

};