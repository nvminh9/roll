import { Link, useNavigate } from 'react-router-dom';
import logo_404 from '~/resource/images/logo_404.svg';

const Missing = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="registerContainer" style={{ background: 'none' }}>
            <article style={{ padding: '100px', display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                <img src={logo_404} style={{ height: '300px', width: '100%' }}></img>
                <h1 style={{ textAlign: 'center' }}>Oops!</h1>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/">
                        <button
                            style={{
                                padding: '10px',
                                border: '.5px solid black',
                                borderRadius: '10px',
                                margin: '10px',
                                width: '100px',
                                cursor: 'pointer',
                            }}
                        >
                            Trang Home
                        </button>
                    </Link>
                    <button
                        onClick={goBack}
                        style={{
                            padding: '10px',
                            border: '.5px solid black',
                            borderRadius: '10px',
                            margin: '10px',
                            width: '100px',
                            cursor: 'pointer',
                        }}
                    >
                        Quay lại
                    </button>
                </div>
            </article>
        </div>
    );
};

export default Missing;
