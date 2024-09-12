import Grid from './grid';

export default function GridSkeleton() {
  return (
    <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item
              key={index}
              className="animate-pulse bg-secondary"
            />
          );
        })}
    </Grid>
  );
}
