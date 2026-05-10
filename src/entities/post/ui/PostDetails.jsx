import {formatFullDate} from '@/features/Post/hook';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { UserInfo } from '@/shared/ui';

import { ImageGrid } from '@/shared/ui';
import { SectionNav } from '@/widget/layout';
import { TagBadge } from '@/entities/tag/ui/TagBadge';

export const PostDetails = ({ description, user, date, image, tags }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (user?._id) navigate(`/user/${user._id}`);
  };

  return (
    <Container
      fluid
      className="border-0 border-bottom border-dark p-3 pt-0 shadow-sm bg-black text-white"
    >
      <SectionNav title="Post" />

      <div className='pt-3'>
        <UserInfo user={user} onProfileClick={handleProfileClick} />
      </div>

      <Row>
        <Col>
          <p className="text-start  mt-2 mb-0 text-break">{description}</p>

          <div className="d-flex flex-wrap gap-2 mb-2">
            {(tags || []).map((t) => (
              <TagBadge key={t._id || t} name={t.name || t} />
            ))}
          </div>
        </Col>
      </Row>

      <ImageGrid images={image} />

      <Row className="mt-2">
        <Col>
          <p className="text-secondary text-start mt-3 mb-0">
            {formatFullDate(date)}
          </p>
        </Col>
      </Row>
    </Container>
  );
};
