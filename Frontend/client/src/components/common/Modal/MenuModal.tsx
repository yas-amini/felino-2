import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./MenuModal.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type Category = {
    title: string;
    items: {
        name: string;
        price: string;
    }[];
};

export default function MenuModal({ isOpen, onClose }: Props) {
    const categories: Category[] = [
        {
            title: "Pizza",
            items: [
                { name: "Margherita", price: "95:-" },
                { name: "Capricciosa", price: "105:-" },
                { name: "Vesuvio", price: "99:-" },
                { name: "Hawaii", price: "105:-" },
                { name: "Rostica", price: "119:-" },
                { name: "Ciao Ciao", price: "129:-" },
            ],
        },
        {
            title: "Hamburgare",
            items: [
                { name: "Classic", price: "95:-" },
                { name: "Bacon & Cheese", price: "109:-" },
                { name: "BBQ-burgare", price: "105:-" },
                { name: "Kycklingburgare", price: "109:-" },
                { name: "Dubbelburgare", price: "129:-" },
            ],
        },
        {
            title: "Kebab",
            items: [
                { name: "Kebabtallrik", price: "119:-" },
                { name: "Kebabrulle", price: "109:-" },
                { name: "Kebab i bröd", price: "99:-" },
                { name: "Kycklingrulle", price: "109:-" },
                { name: "Kebab med ris", price: "119:-" },
            ],
        },
        {
            title: "Pasta",
            items: [
                { name: "Spaghetti Bolognese", price: "119:-" },
                { name: "Carbonara", price: "119:-" },
                { name: "Pasta Pollo", price: "129:-" },
                { name: "Pesto", price: "109:-" },
            ],
        },
        {
            title: "Sallad",
            items: [
                { name: "Grekisk Sallad", price: "109:-" },
                { name: "Kycklingsallad", price: "115:-" },
                { name: "Kebabsallad", price: "115:-" },
                { name: "Caesarsallad", price: "125:-" },
            ],
        },
        {
            title: "Grillat",
            items: [
                { name: "Grillad Fläskfilé", price: "179:-" },
                { name: "Grillad Oxfilé", price: "229:-" },
                { name: "Grillad Kyckling", price: "159:-" },
                { name: "Mixed Grill", price: "239:-" },
            ],
        },
        {
            title: "Dryck",
            items: [
                { name: "Coca-Cola 33cl", price: "20:-" },
                { name: "Coca-Cola Zero 33cl", price: "20:-" },
                { name: "Fanta 33cl", price: "20:-" },
                { name: "Ayran", price: "20:-" },
            ],
        },
        {
            title: "Tillbehör",
            items: [
                { name: "Pommes", price: "35:-" },
                { name: "Vitlökssås", price: "15:-" },
                { name: "Bearnaisesås", price: "15:-" },
                { name: "Pizzasallad", price: "20:-" },
            ],
        },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="wide">
            <div className="menuModal">
                <div className="menuModalTop">
                    <div className="menuModalLogoTitle">
                        <h2 className="menuModalTitle">Felino&apos;s Meny</h2>
                    </div>

                    <p className="menuModalSubtitle">
                        Ett urval av våra mest populära rätter. Se hela menyn för alla
                        alternativ.
                    </p>
                </div>

                <div className="menuModalDivider" />

                <div className="menuModalGrid">
                    {categories.map((category) => (
                        <section className="menuCategoryCard" key={category.title}>
                            <div className="menuCategoryTitle">
                                <span className="menuCategoryTitleText">{category.title}</span>
                            </div>

                            <div className="menuCategoryItems">
                                {category.items.map((item) => (
                                    <div className="menuItemRow" key={item.name}>
                                        <span className="menuItemName">{item.name}</span>
                                        <span className="menuItemPrice">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="menuModalDivider" />

                <div className="menuModalFooter">
                    <p className="menuModalFooterText">
                        Ring för avhämtning eller se hela menyn för samtliga rätter.
                    </p>

                    <div className="menuModalActions">
                        <Link to="/boka-bord" className="menuModalLink">
                            <Button
                                variant="primary"
                                leftIcon={<FontAwesomeIcon icon={faCalendar} />}
                            >
                                Boka bord
                            </Button>
                        </Link>
                        <Link to="/bestall" className="menuModalLink">
                            <Button
                                variant="primary"
                                leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                            >
                                Beställ hem
                            </Button>
                        </Link>
                        <Link to="/meny" className="menuModalLink">
                            <Button variant="secondary">Se hela menyn</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    );
}