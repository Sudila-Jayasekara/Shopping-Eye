import { useState, useEffect, useContext } from 'react'; // Added useContext import
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { getAllItems } from './api'; // Assuming this is your API call for fetching items
import { QuantityContext } from './QuantityContext'; // Import QuantityContext

const images = [
  'https://vudu-space.nyc3.cdn.digitaloceanspaces.com/studiox/general/_hero/014_2022-12-30-022753_uvza.jpg',
  'https://wwd.com/wp-content/uploads/2023/09/LAYOUT-440x285-C-GO14-DP1-INTL_HD-1.jpg',
  'https://findit-resources.s3.amazonaws.com/forums/1698307591365.jpg',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/59/ad/1b.jpg'
];

const HomeShopping = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { quantities } = useContext(QuantityContext); // Now useContext is imported correctly

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = items.filter(item =>
      item.category.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      (item.shop && item.shop.toLowerCase().includes(query))
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen text-gray-200 p-6 bg-white">
      {/* Carousel Section */}
      <div className="relative mb-6">
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
          <img
            src={images[currentImageIndex]}
            alt="Carousel Image"
            className="w-full h-full object-cover mask-gradient"
          />
        </div>

        {/* Overlay for Search Bar & Tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
          <h2 className="text-4xl font-playfair font-bold text-white mb-4">Welcome to Shopping Eye Mall</h2>
          <p className="text-lg font-lora text-white mb-6">"Your One-Stop Shop for Everything!"</p>
          <div className="w-full max-w-md">
            <input
              type="text"
              name="search"
              placeholder="Search by Category, Item Name, or Shop"
              value={searchQuery}
              onChange={handleInputChange}
              className="p-3 w-full rounded bg-gray-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">{item.name}</h3>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="mb-4 w-full h-48 object-cover rounded" />
              )}
              <div className="mb-2">
                <p className="text-2xl font-bold text-grey-400">Rs. {item.price.toFixed(2)}</p>
              </div>
              <div className="mb-2">
                <p className="text-xl">Quantity: {quantities[item.id] || 0}</p> {/* Display quantity */}
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/item/${item.id}`} className="bg-white text-gray-800 px-3 py-1 rounded text-center block">View Details</Link>
                <a
                  href="#"
                  className="text-white hover:text-dark-red transition-colors duration-300 text-2xl ml-4"
                >
                  <i className="fas fa-heart"></i>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center px-4 py-2">No items available</div>
        )}
      </div>

      {/* Inline CSS for Mask Gradient */}
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);
        }
      `}</style>
    </div>
  );
};

export default HomeShopping;
