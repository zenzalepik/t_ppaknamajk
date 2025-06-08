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
    padding: "20px",
    border: "1px dashed #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#777",
  },
};

export default EvoEmpty;
