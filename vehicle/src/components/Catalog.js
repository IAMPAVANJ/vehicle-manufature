import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import './Catalog.css'
import Modal from 'react-bootstrap/Modal';
const Catalog = () => {
    const [allBrandList, setAllBrandList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");
    const [ownerDetail, setOwner] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOwner = (owner) => {
        setOwner(owner);
        handleShow();
    };
    useEffect(() => {
        let url = "https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/honda?format=json";
        if (searchText) {
            url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${searchText}?format=json`;
        }
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setAllBrandList([...data.Results]);
                if (searchType) {
                    let filteredData = allBrandList.filter((item) => item?.VehicleTypes?.[0]?.Name === searchType);
                    if(filteredData.length === 0) {
                        alert("No results found")
                    }
                    setAllBrandList(filteredData);
                }
            })
            .catch((error) => console.error(error));
    }, [searchText, searchType]);
    return (
        <div>
            <header>
                <h1 id="heading">VEHICLE MANUFACTURERS</h1>
            </header>
            <section className="catalog-section">
                <div className="search-container">
                    <div className="search">
                        <label htmlFor="searchByName">Search by Name</label>
                        <input type="text" name="search"  style={{width: "90%"}} id="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <div className="type">
                        <label htmlFor="searchByType">Search by Type</label>
                        <select className="search" style={{width: "160%"}}id="searchByType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">All</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="LMV">LMV</option>
                            <option value="Passenger Car">Passenger Car</option>
                            <option value="Bus">Bus</option>
                            <option value="Truck">Truck</option>
                        </select>
                    </div>
                </div>
              
                <table className="vehicle-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {allBrandList.map((item, i) => {
                        if (item.Mfr_CommonName && item.Country && item.VehicleTypes[0]?.Name) {
                            return (
                                <tr key={i} onClick={() => handleOwner(item)}>
                                    <td>{item.Mfr_CommonName}</td>
                                    <td>{item.Country}</td>
                                    <td>{item.VehicleTypes[0]?.Name}</td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </table>
            
                
                <div>
                    <Modal className="popup-container" show={show} onHide={handleClose} centered>
                        <Modal.Body className="modal-body">{ownerDetail.Country}
                            <div className="ownerDetail-name">{ownerDetail.Mfr_Name}</div>
                            <div className="owner-Ceo">{ownerDetail.PrincipalPositio}</div>
                            <div className="owner-Address">{ownerDetail.Address}</div>
                        </Modal.Body>
                        <Modal.Footer className="footer">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        </div>
    )
}
export default Catalog;







