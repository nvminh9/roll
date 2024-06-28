import HeaderBack from '../HeaderBack';

function MiddleContainer({ children }) {
    //

    return (
        <>
            {/* <!-- Phần khung bên ở giữa --> */}
            <div id="middleContainerID" className="col l-7 m-12 c-12 middleContainer" style={{ padding: 0 }}>
                <HeaderBack></HeaderBack>
                {/* children sẽ là các Page đc truyền vào */}
                {children}
            </div>
        </>
    );
}

export default MiddleContainer;
