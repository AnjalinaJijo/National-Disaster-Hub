import React from "react";

const HomePage = () => {
  return (
    <div className="Container">
      <div className="logo-div">
        <div className="Logo">
          N D H <p className="logo-txt">National Disaster Hub</p>
        </div>
      </div>
      <div className="wrapper">
        <a className="cards" href="/check-in">
          <img className="card-img" src="./images/checkin.avif" alt="checkin" />
          <p className="card-txt">Check in</p>
        </a>
        <a className="cards" href="/find">
          <img
            className="card-img"
            src="./images/find_a_person.jpg"
            alt="find a person"
          />
          <p className="card-txt">Find a person</p>
        </a>
        <a className="cards" href="/disaster">
          <img
            className="card-img"
            src="./images/disaster.avif"
            alt="disaster"
          />
          <p className="card-txt">Disaster Status</p>
        </a>
        <a className="cards" href="/partner">
          <img
            className="card-img"
            src="./images/become_partner.avif"
            alt="become partner"
          />
          <p className="card-txt">Become a Partner</p>
        </a>
      </div>

      {/* <div className="Wrapper">
        <a className='cards'href="/check-in"><p className="card-txt" style={{'position':'absolute','top':'15%','left':'15%'}}>Check in</p><img className='card-img' src="./images/checkin.avif" alt="checkin" /></a>
        <a className='cards'href="/find" ><p className="card-txt" style={{'position':'absolute','top':'15%','left':'65%'}}>Find a person</p><img className='card-img' src="./images/find_a_person.jpg" alt="find A person"  /></a>
        <a className='cards'href="/disaster"><p className="card-txt" style={{'position':'absolute','top':'65%','left':'15%'}}>Disaster Status</p><img className='card-img' src="./images/disaster.avif" alt="disaster"/></a>
        <a className='cards' href="/partner"><p className="card-txt" style={{'position':'absolute','top':'65%','left':'65%'}}>Become a Partner</p><img className='card-img' src="./images/become partner.avif" alt="become partner"/></a>
        </div> */}
    </div>
  );
};

export default HomePage;
