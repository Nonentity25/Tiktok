import { Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import ModalLogin from '~/components/ModalLogin';



const visibilityChange = () => {
    if (document.hidden) {
        const videoStatus = document.querySelectorAll('video')
        videoStatus.forEach(video => {
            video.pause()
        })

    }
}

document.addEventListener("visibilitychange", visibilityChange);



function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
            <ModalLogin />

        </Router>
    );
}

export default App;
