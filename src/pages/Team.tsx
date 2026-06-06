import { AnimatedPage } from '../components/AnimatedPage';
import { team } from '../data/sampleData';

const Team = () => (
  <AnimatedPage>
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Team</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">The builders behind SmartBag Connect</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {team.map((member) => (
          <article key={member.name} className="glass rounded-xl p-6">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-cyanblue/25 bg-cyanblue/10 text-4xl font-semibold text-cyanblue">
              {member.name.split(' ').map((word) => word[0]).join('')}
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">{member.name}</h2>
            <p className="mt-1 text-cyanblue">{member.role}</p>
            <p className="mt-4 leading-7 text-slate-400">{member.bio}</p>
          </article>
        ))}
      </div>
    </section>
  </AnimatedPage>
);

export default Team;
