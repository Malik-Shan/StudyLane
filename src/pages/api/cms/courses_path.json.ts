import { getCollection } from 'astro:content';
const courses = await getCollection('courses');
export async function GET() {
	return new Response(
		JSON.stringify({
			title: "Courses Path",
			paths: courses.map((c) => {
				return { name: c.data.name, type: c.data.information.type, path: c.slug };
			}),
		}), {
		headers: {
			'Content-Type': 'application/json',
		}
	});
};
