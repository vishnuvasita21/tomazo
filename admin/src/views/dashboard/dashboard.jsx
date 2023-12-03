const AdminDashboard = () => {
  const headerStyle = {
    backgroundColor: "#ca3433",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoutButtonStyle = {
    background: "transparent",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
  };

  const iframeStyle = {
    width: "80%",
    height: "400px",
    margin: "2rem auto",
    display: "block",
    border: "none",
  };

  return (
    <div>
      <div style={headerStyle}></div>
      <div className="content-section" style={{ padding: "1rem" }}>
        {/* top 10 times */}

        <iframe
          title="Looker Studio Report"
          style={iframeStyle}
          src="https://lookerstudio.google.com/embed/reporting/80118ebc-0fdd-4afd-8d5a-0549fce5668d/page/XW5jD"
          allowFullScreen
        ></iframe>

        {/* top 10 customers */}

        <iframe
          title="Looker Studio Report"
          style={iframeStyle}
          src="https://lookerstudio.google.com/embed/reporting/e2b709d7-d068-4083-9115-624d02f935cf/page/wW5jD%22"
          allowFullScreen
        ></iframe>

        {/* top 10  */}

        <iframe
          title="Looker Studio Report"
          style={iframeStyle}
          src="https://lookerstudio.google.com/embed/reporting/0c73cc90-b0c9-4a9a-b3bf-627a9bd781ed/page/3U5jD%22"
          allowFullScreen
        ></iframe>

        {/* top 10  */}

        <iframe
          title="Looker Studio Report"
          style={iframeStyle}
          src="https://lookerstudio.google.com/embed/reporting/1a2c3f82-a4f0-45d3-8719-72308bb80b95/page/ea5jD%22"
          allowFullScreen
        ></iframe>

        {/* top 10 dishes across restaurants */}
        <iframe
          width="1500"
          height="450"
          src="https://lookerstudio.google.com/embed/reporting/3d131c08-f940-438b-8dec-fca7beccd323/page/tEnnC"
          frameborder="0"
          style={{ border: "0" }}
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default AdminDashboard;
