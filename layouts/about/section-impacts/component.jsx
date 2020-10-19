import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, Row, Column } from 'gfw-components';

import Card from 'components/ui/card';

import awards0 from 'pages/about/section-impacts/images/awards.png?webp';
import awards1 from 'pages/about/section-impacts/images/awards1.png?webp';
import awards2 from 'pages/about/section-impacts/images/awards2.png?webp';
import awards3 from 'pages/about/section-impacts/images/awards3.png?webp';

import './styles.scss';

const awards = [
  {
    img: awards0,
    link: 'http://events.esri.com/conference/sagList/',
    title: 'SAG list',
  },
  {
    img: awards1,
    link:
      'http://www.unglobalpulse.org/big-data-climate-challenge-winners-announced',
    title: 'Big data climate challenge',
  },
  {
    img: awards2,
    link: 'http://www.socialtech.org.uk/projects/global-forest-watch/',
    title: 'Social tech',
  },
  {
    img: awards3,
    link:
      'http://www.computerworld.com/article/2977562/data-analytics/world-resources-institute.html',
    title: 'WRI',
  },
];

const SectionImpacts = ({ impactProjects }) => (
  <section className="l-section-impacts">
    <Row>
      <Column>
        <h3>Impacts</h3>
      </Column>
    </Row>
    <Row>
      <Column>
        {impactProjects && (
          <Carousel>
            {impactProjects.map((c) => (
              <div key={c.id}>
                <Card
                  key={c.title}
                  data={{
                    ...c,
                    buttons: [
                      {
                        className: 'read-more',
                        text: 'READ MORE',
                        extLink: c.extLink,
                      },
                    ],
                  }}
                />
              </div>
            ))}
          </Carousel>
        )}
      </Column>
    </Row>
    <Row className="awards">
      <Column>
        <h3>Awards</h3>
      </Column>
      {awards.map((l) => (
        <Column width={[1, 1 / 2, 1 / 4]}>
          <a
            key={l.title}
            href={l.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt={l.title} src={l.img} />
          </a>
        </Column>
      ))}
    </Row>
  </section>
);

SectionImpacts.propTypes = {
  impactProjects: PropTypes.array.isRequired,
};

export default SectionImpacts;
