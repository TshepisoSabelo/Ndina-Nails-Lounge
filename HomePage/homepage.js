//html elements for booking an appointment
let btnOk = document.getElementById("okay");
let inputName = docuemnt.getElementById("First");
let inputSurname = docuemnt.getElementById("LastName");
let inputEmail = docuemnt.getElementById("EmailAddress");
let inputPhone = docuemnt.getElementById("PhoneNumber");
let selectService = docuemnt.getElementById("Services");
let selectDate = document.getElementById("date");
let Alertmsg = document.getElementById("alerttittle");
let Alertbox = document.querySelector(".bookingalert");
let refNum = document.getElementById('refNum');
let eBody = document.body;
let bookings = [];

class Customer{
    #_name;
    #_surname;
    #_emailAddress;
    #_service;
    #_date;
    static _alphaNumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    constructor(name,surname, emailaddress, servicetype, date)
    {
        this.#_name = name;
        this.#_surname = surname;
        this.#_emailAddress = emailaddress;
        this.#_service = servicetype;
        this.#_date = date;
    };

    generateReference(){
        reference = [];
        intLength = this._alphaNumeric.length;
        for(i = 0; i<10; i++)
        {
            reference[i] = Customer._alphaNumeric[Math.floor(Math.random()*intLength)];
        }
        return reference.join(''); //Join the reference array into a string and return it
    };
};

function sendBooking()
{
    let counter = 0;
    const inputs = [inputName, inputSurname, inputEmail,  inputPhone, selectService, selectDate];
    inputs.forEach(element =>  
        {
            if (element.value === '')
                {
                    counter++;
                };
        }
    );

    eBody.style.overflow = 'hidden';

    if(counter>0)
    {
        Alertbox.style.display = 'flex';
        Alertmsg.textContent = "Please fill in all field";
    }
    else if(counter === 0)
    {
        const newCustomer = new Customer(inputName.value, inputSurname.value, inputEmail.value,  inputPhone.value, selectService.value, selectDate.value)
        const ReferenceNum = newCustomer.generateReference();
        Alertbox.style.display = 'flex';
        refNum.textContent = ReferenceNum;
        Alertmsg.textContent = "Thank you for booking an Appointment with us. Your booking number is: ";
        bookings.push(newCustomer);
    };
};

function dismissAlert(){
    Alertbox.style.display = '';
    eBody.style.overflow = '';
};