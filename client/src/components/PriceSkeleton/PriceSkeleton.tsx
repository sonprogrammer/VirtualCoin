import Skeleton from "@mui/material/Skeleton";

export const PriceSkeleton = ({ width = 70 }: { width?: number }) => (
  <div className="flex justify-end">
    <Skeleton
      variant="rounded"
      animation="wave"
      width={width}
      height={12}
      sx={{
        borderRadius: "6px",
        bgcolor: "rgba(148, 163, 184, 0.12)",
        "&::after": {
          background: "linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.15), transparent)"
        }
      }}
    />
  </div>
);