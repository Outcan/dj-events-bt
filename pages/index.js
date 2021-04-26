import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout>
      <Head>
        <meta name="time" content="15:10" />
      </Head>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`, { method: "GET" });
  const events = await res.json();
  return { props: { events }, revalidate: 1 };
}
