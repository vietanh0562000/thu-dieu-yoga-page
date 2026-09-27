import { IconButton } from './IconButton';

interface ClassCardProps {
  title: string;
  location: string;
  image?: string;
  onOpen?: () => void;
}

export function ClassCard({ title, location, image, onOpen }: ClassCardProps) {
  return (
    <div className="class-card">
      <div className="class-card__media">{image && <img src={image} alt={title} />}</div>
      <div className="class-card__footer">
        <div>
          <div className="class-card__meta">{location}</div>
          <div className="class-card__title">{title}</div>
        </div>
        <IconButton label={`Open ${title}`} onClick={onOpen} />
      </div>
    </div>
  );
}
