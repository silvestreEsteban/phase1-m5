import './styles/layout.css';
import Header from './Components/Header';
import Info from './Components/Info';
import SearchCatalogue from './Components/SearchCatalogue';
import CustomSearchEngine from './Components/FetchSuggestions';
function App() {
 

  return (
    <>
      <div className="layout-of-page">
        <Header />
        <Info />
        <SearchCatalogue />
      </div>
    </>
  )
}

export default App
