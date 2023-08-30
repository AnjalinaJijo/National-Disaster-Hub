import React from 'react';

const HomePage = () => {

  return (
        <div className="Container">
        <div className='logo-div'>
        <div className='Logo'>N   D   H <p className='logo-txt'>National Disaster Hub</p></div>
        </div>
        <div className="Wrapper">
        <a className='cards'href="/find" ><p className="card-txt" style={{'position':'absolute','top':'15%','left':'15%'}}>Find a person</p><img className='card-img' src="./images/find_a_person.jpg" alt="find A person"  /></a>
        <a className='cards'href="/disaster"><p className="card-txt" style={{'position':'absolute','top':'15%','left':'65%'}}>Disaster Status</p><img className='card-img' src="./images/disaster.avif" alt="disaster"/></a>
        <a className='cards'href="/check-in"><p className="card-txt" style={{'position':'absolute','top':'65%','left':'15%'}}>Check in</p><img className='card-img' src="./images/checkin.avif" alt="checkin" /></a>
        <a className='cards' href="/partner"><p className="card-txt" style={{'position':'absolute','top':'65%','left':'65%'}}>Become a Partner</p><img className='card-img' src="./images/become partner.avif" alt="become partner"/></a>
        </div>
        </div>


  )
}

export default HomePage
