import { useNavigate } from 'react-router-dom';
import unauthorized_logo from '~/resource/images/unauthorized_logo.png';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="registerContainer" style={{ background: 'none' }}>
            <section style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <img src={unauthorized_logo} style={{ height: '300px', width: '100%' }}></img>
                <h1>Unauthorized</h1>
                <br />
                <p>Bạn không có quyền truy cập vào trang này</p>
                <div className="flexGrow">
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
            </section>
        </div>
    );
};

export default Unauthorized;
