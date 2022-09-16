import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const SearchResult = () => {
  return (
    <div>
      <BreadCrumbs />
      <Card>
        <CardBody>
          <CardTitle tag="h4">Search Result For &quot;Angular Js&quot;</CardTitle>
          <CardSubtitle className='text-muted'>About 14,700 result ( 0.10 seconds)</CardSubtitle>
          <ListGroup flush className="search-listing mt-4">
            <ListGroupItem className="ps-0 border-top-0 border-bottom-0">
              <h4 className="mb-0">
                <a href="/" className="text-cyan font-medium p-0">
                  AngularJs
                </a>
              </h4>
              <a href="/" className="search-links p-0 text-success">
                www.google.com/angularjs
              </a>
              <p className="mb-0">
                Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat
                pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
              </p>
            </ListGroupItem>
            <ListGroupItem className="ps-0 border-top border-bottom-0">
              <h4 className="mb-0">
                <a href="/" className="text-cyan font-medium p-0">
                  AngularJS — Superheroic JavaScript MVW Framework
                </a>
              </h4>
              <a href="/" className="search-links p-0 text-success">
                www.google.com/angularjs
              </a>
              <p className="mb-0">
                Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat
                pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
              </p>
            </ListGroupItem>
            <ListGroupItem className="ps-0 border-top border-bottom-0">
              <h4 className="mb-0">
                <a href="/" className="text-cyan font-medium p-0">
                  AngularJS Tutorial - W3Schools
                </a>
              </h4>
              <a href="/" className="search-links p-0 text-success">
                www.google.com/angularjs
              </a>
              <p className="mb-0">
                Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat
                pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
              </p>
            </ListGroupItem>
            <ListGroupItem className="ps-0 border-top border-bottom-0">
              <h4 className="mb-0">
                <a href="/" className="text-cyan font-medium p-0">
                  Introduction to AngularJS - W3Schools
                </a>
              </h4>
              <a href="/" className="search-links p-0 text-success">
                www.google.com/angularjs
              </a>
              <p className="mb-0">
                Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat
                pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
              </p>
            </ListGroupItem>
            <ListGroupItem className="ps-0 border-top border-bottom-0">
              <h4 className="mb-0">
                <a href="/" className="text-cyan font-medium p-0">
                  AngularJS Tutorial
                </a>
              </h4>
              <a href="/" className="search-links p-0 text-success">
                www.google.com/angularjs
              </a>
              <p className="mb-0">
                Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat
                pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
              </p>
            </ListGroupItem>
            <ListGroupItem className="ps-0 border-top border-bottom-0">
              <h4 className="mb-0">
                <a href="/" className="text-cyan font-medium p-0">
                  Angular 2: One framework.
                </a>
              </h4>
              <a href="/" className="search-links p-0 text-success">
                www.google.com/angularjs
              </a>
              <p className="mb-0">
                Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat
                pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
              </p>
            </ListGroupItem>
          </ListGroup>
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchResult;
