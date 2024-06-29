import 'flatpickr/dist/themes/light.css';
import 'react-data-grid/lib/styles.css';
import ReactDOM from 'react-dom/client';
import 'react-modal-video/css/modal-video.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar-react/dist/simplebar.min.css';
import '../src/assets/scss/app.scss';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import store from './store';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter>
            <ScrollToTop />
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </>
);
