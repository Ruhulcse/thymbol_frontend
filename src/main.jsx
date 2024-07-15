import 'flatpickr/dist/themes/light.css';
import 'react-data-grid/lib/styles.css';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import 'react-modal-video/css/modal-video.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar-react/dist/simplebar.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../src/assets/scss/app.scss';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import './i18n';
import ErrorFallback from './pages/error';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={console.error('Error fallback')}
            >
                <ScrollToTop />
                <Toaster />
                <Provider store={store}>
                    <App />
                </Provider>
            </ErrorBoundary>
        </BrowserRouter>
    </>
);
