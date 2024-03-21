const Card = () => {
  return (
    <>
      <div className="card-container container-fluid">
        <div className="card mb-3 container-sm shadow p-3 mb-5 bg-body-tertiary rounded my-4">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="https://art.ngfiles.com/images/34000/34569_danigan_storm-trooper.png?f1249725130"
                className="img-fluid rounded-circle"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="card-body my-4 ms-2">
                <h2 className="card-title fs-1">Antonio Chamal</h2>
                <p className="card-text fs-4"><i className="fa-solid fa-location-dot"></i> Av. Sarlaac 777, Corellia</p>
                <p className="card-text fs-4"><i className="fa-solid fa-phone"></i> (666) 997 744 213</p>
                <p className="card-text fs-4"><i className="fa-solid fa-at"></i> antonio.chamal@deathstar.com</p>
              </div>
            </div>
            <div className="col-md-2">
                <div className="buttons d-flex flex-column mt-5">
                    <button type="button" className="btn btn-lg"><i className="fa-solid fa-pencil fs-3"></i></button>
                    <button type="button" className="btn btn-lg"><i className="fa-solid fa-eraser fs-3"></i></button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
