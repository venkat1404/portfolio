// About page copy. Four paragraphs per spec §10.
// Written in first person, short sentences, no adjective clichés.
// Working belief in para 2 is Venkat's own team finding from the Airbnb project.
export const about = {
  paragraphs: [
    {
      key: "background",
      body: "I did my undergrad in Computer Science at Manipal Institute of Technology, then spent a year and a half at Accordion India (a private-equity consulting hub) building ETL pipelines and Power BI dashboards for U.S. portfolio companies. Half the day I was in SSIS and SQL Server, the other half in Power BI and stakeholder calls. It taught me faster than anything else that a data product only matters if a decision actually gets made from it.",
    },
    {
      key: "belief",
      body: "The thing I care most about is closing the loop between data and decisions. In my Airbnb quality-classification project, our team's finding was that feature engineering moved the needle far more than model choice; a well-shaped feature set made a plain logistic regression beat tuned tree ensembles. I think that generalizes: the interesting problem is usually one layer earlier than where people are looking. Get the pipeline, the features, and the interface right and the model is almost incidental.",
    },
    {
      key: "current",
      body: "I'm now doing my MS in Information Systems at UMD's Robert H. Smith School of Business (GPA 3.95, Terrapin Scholar), with coursework spanning data mining, cloud computing, and applied AI systems. Outside classes I've been building multi-agent systems on the Anthropic API and getting deeper into modern gradient boosting for tabular data. Targeting Data Engineer, BI Engineer, and Data Analyst roles for December 2026, and open to summer 2026 internships in the meantime.",
    },
    {
      key: "outside-work",
      body: "Outside work I'm a Barça culer through and through. I watch La Liga and Champions League matches, and I still play football whenever I can. I lift five days a week. I'm into films across genres and music of most kinds. Both feel like the same thing as data work in one small way: what feels obvious about them is almost never actually why they work.",
    },
  ],
} as const;
