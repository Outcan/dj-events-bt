import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`, { method: "GET" });
  const events = await res.json();
  return { props: { events }, revalidate: 1 };
}

export default EventsPage;
