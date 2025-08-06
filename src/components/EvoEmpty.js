const EvoEmpty = ({ message = "Data tidak tersedia", icon }) => {
  return (
    <div style={styles.container}>
      {icon && <div style={styles.icon}>{icon}</div>}
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px 12px 0px 12px",
    border: "1px dashed #ccc",
    borderRadius: "8px",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: "12px",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  message: {
    // fontSize: "16px",
    color: "#777",
  },
};

export default EvoEmpty;
