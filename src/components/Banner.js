const Banner = ({ images, speed }) => {
  return (
    <div className="inner">
      <div className="swiper-wrapper">
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="swiper-slide" key={id}>
              <img src={image} alt="" />
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="swiper-slide" key={id}>
              <img src={image} alt="" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export { Banner };
