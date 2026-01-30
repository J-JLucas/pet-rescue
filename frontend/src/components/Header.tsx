
export function Header() {

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Welcome to Pet Rescue</h1>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#058743',
    color: 'white',
    marginBottom: '25px',
    padding: '1rem',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',

  },
}

