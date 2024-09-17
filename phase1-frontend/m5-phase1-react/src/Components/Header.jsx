import '../styles/Header.css';
export default function Header() {
    return (
    <div className="header">
        <div className='top-header'>
            <div className='container-for-top-header-buttons-left'>
                <button className='top-header-button'>Trade Me</button>
                <button className='top-header-button'>Trade Me Insurance</button>
                <button className='top-header-button'>Holiday Houses</button>
                <button className='top-header-button'>Find Someone</button>
                <button className='top-header-button'>Motor Web</button>
                <button className='top-header-button'>homes.co.nz</button>
            </div>
            <div className='container-for-top-header-buttons-right'>
                <button className='top-header-button'>Register</button>
                <button className='top-header-button'>Log In</button>
                </div>
        </div>
        <div className='bottom-header'>
            <div className='container-for-bottom-header-buttons-left'>
                <button className='bottom-header-button'><img src='https://glasshousenz.com/wp-content/uploads/2020/04/trademe-1.png' alt='trade me logo' id='trademe-logo'></img></button>
                <button className='bottom-header-button'>Browse</button>
            </div>
            <div className='container-for-bottom-header-buttons-right'>
                <button className='bottom-header-button'>Watchlist</button>
                <button className='bottom-header-button'>Favourites</button>
                <button className='bottom-header-button'>Start a listing</button>
                <button className='bottom-header-button'>My Trade Me</button>         
        </div>
    </div>
    </div>
)
}