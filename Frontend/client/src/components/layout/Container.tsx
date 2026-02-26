type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem" }}>
      {children}
    </div>
  );
}