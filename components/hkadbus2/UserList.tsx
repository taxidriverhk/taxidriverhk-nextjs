import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import styles from "components/hkadbus2/styles/User.module.css";
import { User } from "shared/types/hkadbus2-types";

type UserListPropType = {
  hrefFunc: (username: string) => string;
  users: Array<User>;
};

type UserPropType = {
  hrefFunc: (username: string) => string;
  user: User;
};

function UserItem({ hrefFunc, user }: UserPropType) {
  const { username, thumbnail } = user;
  const thumbnailToUse =
    thumbnail != null ? thumbnail : "/hkadbus2/profile-image-placeholder.jpg";

  return (
    <Button
      href={hrefFunc(username)}
      variant="none"
      className={styles["user-item-container"]}
    >
      <Card>
        <Card.Body>
          <Image
            className={styles["user-item-thumbnail"]}
            src={thumbnailToUse}
            roundedCircle
          />
          <span className={styles["user-item-username"]}>{username}</span>
        </Card.Body>
      </Card>
    </Button>
  );
}

export default function UserList({ hrefFunc, users }: UserListPropType) {
  return (
    <Container>
      <Row>
        {users.map((user) => (
          <Col key={user.username} xs={12} md={6}>
            <UserItem hrefFunc={hrefFunc} user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
