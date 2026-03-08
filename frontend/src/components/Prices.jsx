import { motion } from 'framer-motion';

export default function Prices(){
const manicure = [
    { id: 1, name: "Basic Manicure", price: "R150" },
    { id: 2, name: "Gel Manicure", price: "R250" },
    { id: 3, name: "Acrylic Overlay", price: "R300" },
    { id: 4, name: "Acrylic Full Set", price: "R400" },
    { id: 5, name: "Soft Gel Extensions", price: "R450" },
    { id: 6, name: "PolyGel Set", price: "R420" },
    { id: 7, name: "French Manicure", price: "R280" },
    { id: 8, name: "Soak Off (Gel Removal)", price: "R100" },
    { id: 9, name: "Nail Repair (Per Nail)", price: "R30" },
    { id: 10, name: "Buff & Shine", price: "R120" }
];

const pedicure = [
    { id: 1, name: "Basic Pedicure", price: "R200" },
    { id: 2, name: "Gel Pedicure", price: "R300" },
    { id: 3, name: "Spa Pedicure", price: "R350" },
    { id: 4, name: "Deluxe Spa Pedicure", price: "R450" },
    { id: 5, name: "Callus Removal Treatment", price: "R150" },
    { id: 6, name: "Paraffin Wax Treatment", price: "R180" },
    { id: 7, name: "French Pedicure", price: "R320" },
    { id: 8, name: "Toenail Reconstruction", price: "R250" }
];

const extras = [
    { id: 1, name: "Nail Art (Simple)", price: "R50" },
    { id: 2, name: "Nail Art (Advanced)", price: "R120" },
    { id: 3, name: "Chrome Finish", price: "R80" },
    { id: 4, name: "Ombre Design", price: "R100" },
    { id: 5, name: "French Tip Add-On", price: "R40" },
    { id: 6, name: "Glitter Add-On", price: "R60" },
    { id: 7, name: "3D Nail Charms", price: "R70" },
    { id: 8, name: "Rhinestones (Per Nail)", price: "R15" },
    { id: 9, name: "Hand Massage (15 mins)", price: "R90" },
    { id: 10, name: "Foot Massage (20 mins)", price: "R120" }
];

    return(
        <div className="pricelist">
            <h3 className="heading pricelist-heading">Manicure</h3>
            <div className="pricelist-container">
            {manicure.map(item => (
                <div key = {item.id} className="price-Item">
                    <p className="item-name">{item.name}</p>
                    <p className="item-Price">{item.price}</p>
                </div>
                ))}
            </div>
            <h3 className="pricelist-heading">Padicure</h3>
            <div className="pricelist-container">
                {pedicure.map(item => (
                <div key = {item.id} className="price-Item">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">{item.price}</p>
                </div>
                ))}
            </div>
            <h3 className="pricelist-heading">Extras</h3>
            <div className="pricelist-container">
                {extras.map(item => (
                <div key = {item.id} className="price-Item">
                    <p className="item-name">{item.name}</p>
                    <p className="item-Price">{item.price}</p>
                </div>
                ))}
            </div>

        </div>
    )
}