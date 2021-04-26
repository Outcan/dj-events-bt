import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";

import { API_URL } from "@/config/index";

const EventPage = ({ event }) => {
  console.log(event);
  const deleteEvent = (evt) => console.log("delete event");

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete event
          </a>
        </div>
        <span>
          {new Date(event.date).toLocaleDateString("en-GB")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image.formats.medium.url} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"\u00ab"} Back to events</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`, { method: "GET" });
  const events = await res.json();

  const paths = events.map((event) => ({
    params: {
      slug: event.slug
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`, { method: "GET" });
  const events = await res.json();
  console.log(events);
  return { props: { event: events[0] }, revalidate: 1 };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`, { method: "GET" });
//   const events = await res.json();
//   return { props: { event: events[0] } };
// }

export default EventPage;
