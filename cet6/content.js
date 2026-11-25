/* 原创学习样例；非官方真题或官方词表，解析尚未经教师审核。 */
(() => {
  const rows = [
    ['allocate','/ˈæləkeɪt/','分配；拨出','词族：allocation 分配','The university allocated more funds to accessible learning spaces.','大学为无障碍学习空间拨出了更多资金。'],
    ['assess','/əˈses/','评估；评价','词族：assessment 评估','A short quiz helps teachers assess what students actually understand.','小测验帮助教师评估学生真正理解了什么。'],
    ['sustain','/səˈsteɪn/','维持；支撑','词族：sustainable 可持续的','Regular feedback can sustain a learner’s motivation.','定期反馈可以维持学习者的动力。'],
    ['substantial','/səbˈstænʃəl/','大量的；重大的','词族：substantially 大幅地','The new policy led to a substantial reduction in food waste.','新政策使食物浪费大幅减少。'],
    ['retain','/rɪˈteɪn/','保留；记住','词族：retention 保留；记忆','Testing yourself helps you retain information for longer.','自我测试有助于更长久地记住信息。'],
    ['incentive','/ɪnˈsentɪv/','激励；刺激因素','搭配：an incentive to do 做某事的动力','Flexible working hours provide an incentive to stay with the company.','灵活的工作时间为员工留在公司提供了动力。'],
    ['constraint','/kənˈstreɪnt/','限制；约束','词族：constrain 限制','Budget constraints forced the team to simplify its design.','预算限制迫使团队简化设计。'],
    ['feasible','/ˈfiːzəbəl/','可行的','词族：feasibility 可行性','The pilot study will show whether the plan is feasible.','试点研究将说明该计划是否可行。'],
    ['resilient','/rɪˈzɪliənt/','有韧性的；能恢复的','词族：resilience 韧性','A resilient city can recover quickly from unexpected disruption.','具有韧性的城市能从意外干扰中迅速恢复。'],
    ['inevitable','/ɪnˈevɪtəbəl/','不可避免的','前缀：in- 表否定；词族：inevitably','Some disagreement is inevitable when priorities differ.','当优先事项不同时，某些分歧不可避免。'],
    ['deteriorate','/dɪˈtɪəriəreɪt/','恶化；变坏','词族：deterioration 恶化','Air quality may deteriorate during periods of heavy traffic.','交通繁忙期间空气质量可能恶化。'],
    ['enhance','/ɪnˈhɑːns/','提高；增强','词族：enhancement 增强','Clear examples enhance our understanding of abstract ideas.','清晰的例子增进我们对抽象概念的理解。'],
    ['ambiguous','/æmˈbɪɡjuəs/','含糊的；有歧义的','词族：ambiguity 歧义','The ambiguous instruction confused several participants.','这条含糊的指令使几位参与者感到困惑。'],
    ['coherent','/kəʊˈhɪərənt/','连贯的；一致的','词族：coherence 连贯性','A coherent essay connects each example to its central argument.','一篇连贯的文章会将每个例子与中心论点联系起来。'],
    ['empirical','/ɪmˈpɪrɪkəl/','以观察或实验为依据的','搭配：empirical evidence 实证证据','The claim requires empirical evidence rather than personal impressions.','该论断需要实证证据，而非个人印象。'],
    ['hypothesis','/haɪˈpɒθəsɪs/','假设','复数：hypotheses','The experiment was designed to test a specific hypothesis.','该实验旨在检验一个特定假设。'],
    ['implication','/ˌɪmplɪˈkeɪʃən/','可能的影响；含义','词族：imply 暗示','The findings have important implications for public transport planning.','这些发现对公共交通规划具有重要影响。'],
    ['predominant','/prɪˈdɒmɪnənt/','占主导地位的','词族：predominantly 主要地','Cost remains the predominant concern for many households.','费用仍是许多家庭最关心的问题。'],
    ['proportion','/prəˈpɔːʃən/','比例；部分','词族：proportional 成比例的','A growing proportion of students use digital textbooks.','越来越大比例的学生使用数字教材。'],
    ['comprehensive','/ˌkɒmprɪˈhensɪv/','全面的；综合的','搭配：a comprehensive review 全面评审','The report provides a comprehensive review of the available options.','该报告对现有选项进行了全面评审。'],
    ['conventional','/kənˈvenʃənəl/','传统的；常规的','词族：convention 惯例','The project challenges conventional ideas about classroom design.','该项目挑战了有关教室设计的传统观念。'],
    ['facilitate','/fəˈsɪlɪteɪt/','促进；使便利','词族：facilitation 促进','Shared notes facilitate communication between research teams.','共享笔记使研究团队之间的交流更加便利。'],
    ['fluctuate','/ˈflʌktʃueɪt/','波动；起伏','词族：fluctuation 波动','Demand for electricity tends to fluctuate throughout the day.','用电需求通常在一天中不断波动。'],
    ['integrate','/ˈɪntɪɡreɪt/','整合；融入','词族：integration 整合','The course integrates practical tasks with theoretical discussion.','该课程将实践任务与理论讨论结合起来。'],
    ['justify','/ˈdʒʌstɪfaɪ/','证明合理；为……辩护','词族：justification 正当理由','A small improvement may not justify such a large expense.','小幅改善可能不足以证明如此巨大的支出是合理的。'],
    ['neglect','/nɪˈɡlekt/','忽视；疏于照顾','词族：neglected 被忽视的','Students should not neglect sleep while preparing for examinations.','学生备考时不应忽视睡眠。'],
    ['persistent','/pəˈsɪstənt/','持续的；坚持不懈的','词族：persist 坚持','Persistent practice matters more than one unusually long session.','持续练习比一次格外漫长的学习更重要。'],
    ['preliminary','/prɪˈlɪmɪnəri/','初步的；预备的','搭配：preliminary findings 初步发现','The preliminary findings should be interpreted with caution.','应谨慎解读这些初步发现。'],
    ['priority','/praɪˈɒrəti/','优先事项；优先权','词族：prioritize 优先处理','Improving access to reliable information is a priority.','改善获取可靠信息的渠道是一项优先任务。'],
    ['reluctant','/rɪˈlʌktənt/','不情愿的；勉强的','词族：reluctance 不情愿','Some residents were reluctant to change their commuting habits.','一些居民不愿改变通勤习惯。'],
    ['scarce','/skeəs/','稀缺的；不足的','词族：scarcity 稀缺','Clean water becomes scarce during a prolonged drought.','长期干旱期间，清洁水源变得稀缺。'],
    ['sufficient','/səˈfɪʃənt/','足够的；充分的','反义：insufficient 不足的','One correct answer is not sufficient evidence of lasting mastery.','仅答对一次不足以证明已经长期掌握。'],
    ['transparent','/trænsˈpærənt/','透明的；公开易懂的','词族：transparency 透明度','Transparent assessment criteria help students plan their work.','公开易懂的评价标准有助于学生规划学习。'],
    ['underlying','/ˌʌndəˈlaɪɪŋ/','潜在的；根本的','词族：underlie 构成……的基础','The interview revealed an underlying problem with the schedule.','访谈揭示了时间安排中一个根本性问题。'],
    ['viable','/ˈvaɪəbəl/','切实可行的；能维持的','词族：viability 可行性','The team is searching for a financially viable solution.','团队正在寻找在财务上可持续的解决方案。'],
    ['widespread','/ˈwaɪdspred/','广泛的；普遍的','构词：wide 广泛 + spread 传播','The proposal received widespread support from local residents.','该提案获得了当地居民的广泛支持。']
  ];
  const words = rows.map((r, i) => {
    const answer = (i * 3 + 1) % 4;
    const options = [rows[(i + 7) % rows.length][2], rows[(i + 15) % rows.length][2], rows[(i + 23) % rows.length][2]];
    options.splice(answer, 0, r[2]);
    return {id:`w${i+1}`, word:r[0], phonetic:r[1], meaning:r[2], root:r[3], example:r[4], translation:r[5], options, answer};
  });
  const reading = [
    {id:'r1',title:'A Library Beyond Its Walls',tag:'仔细阅读',paragraphs:[
      'When a neighbourhood library extended its opening hours, staff expected a sharp rise in book borrowing. Instead, the most noticeable change was the arrival of people carrying laptops and notebooks. Many had reliable internet at home, but they wanted a quiet place where studying felt like a shared activity. The library had become valuable for something its catalogue could not measure.',
      'This experience encouraged the manager to reconsider the building’s layout. Rather than replacing shelves with an expensive digital studio, she introduced a small silent area and a room for group discussion. Visitors could choose the environment that suited their task. Staff also began counting how people used the space, while avoiding the collection of names or browsing histories.',
      'The figures suggested that longer opening hours helped shift workers in particular. However, the manager resisted describing every additional visit as evidence of better learning. A comfortable seat can create an opportunity to study, but it cannot guarantee concentration or understanding. The library therefore invited visitors to suggest practical improvements and offered optional workshops on evaluating information. Its aim was to remove barriers to learning, while recognising that attendance alone reveals very little about what a person has learned.'
    ],questions:[
      {id:'r1q1',prompt:'What surprised library staff after the opening hours were extended?',options:['Most visitors stopped borrowing printed books.','More visitors used the library as a shared study space.','Visitors mainly came because they lacked home internet.','A digital studio attracted the greatest number of people.'],answer:1,explanation:'第一段说明最明显的变化是带电脑和笔记本来学习的人增多；许多人家里也有可靠网络。',evidence:'they wanted a quiet place where studying felt like a shared activity'},
      {id:'r1q2',prompt:'How did the manager adapt the library?',options:['She required visitors to record their browsing histories.','She replaced the collection with digital equipment.','She limited all rooms to silent individual work.','She created different spaces for different study needs.'],answer:3,explanation:'第二段分别设置安静区域与讨论室，目的是满足不同学习任务。',evidence:'Visitors could choose the environment that suited their task.'},
      {id:'r1q3',prompt:'Which view would the manager most likely support?',options:['Access supports learning, but attendance does not prove mastery.','Counting visits is sufficient to evaluate learning outcomes.','Workshops should be compulsory for every visitor.','Longer hours benefit only people with conventional working schedules.'],answer:0,explanation:'末段区分了学习机会与实际学习效果；到场次数不能证明学会了多少。',evidence:'attendance alone reveals very little about what a person has learned'}
    ]},
    {id:'r2',title:'The Hidden Work of Repair',tag:'仔细阅读',paragraphs:[
      'At a monthly repair workshop, volunteers help residents fix lamps, bicycles and small household appliances. The organisers initially assumed that saving money would be the main attraction. Yet interviews revealed another motivation: people disliked discarding objects that still seemed useful. A repaired radio could preserve a family memory as well as reduce waste.',
      'Not every item could be repaired. Some products were sealed so tightly that opening them caused further damage, while replacement parts were sometimes more expensive than new devices. Volunteers kept a record of these obstacles. Their notes showed that individual enthusiasm could not compensate fully for design choices made long before a product reached its owner.',
      'The workshop also changed how participants understood expertise. Rather than taking an object away and returning it fixed, volunteers explained each safe step and encouraged owners to observe. Electrical repairs requiring professional qualifications were referred elsewhere. This approach took longer, but it helped participants recognise simple faults and understand when specialist help was necessary.',
      'The organisers now judge success by more than the number of objects repaired. They also ask whether people have gained enough confidence to maintain what they own. Repair, in their view, is both a practical service and an opportunity to question the habit of immediate replacement.'
    ],questions:[
      {id:'r2q1',prompt:'What did the interviews reveal about participants?',options:['They preferred new products to familiar possessions.','They expected all repairs to be completed immediately.','They valued keeping useful or personally meaningful objects.','They considered environmental concerns irrelevant.'],answer:2,explanation:'第一段指出参与者不愿丢弃仍有用途的物品，旧收音机还可能承载家庭记忆。',evidence:'A repaired radio could preserve a family memory as well as reduce waste.'},
      {id:'r2q2',prompt:'Why did volunteers record obstacles to repair?',options:['To document limitations connected with product design and parts.','To prove that owners were responsible for every fault.','To identify which residents could afford replacement devices.','To eliminate the need for professional repair services.'],answer:0,explanation:'记录揭示密封设计、配件费用等结构性限制，个人热情并不能完全克服这些问题。',evidence:'individual enthusiasm could not compensate fully for design choices'},
      {id:'r2q3',prompt:'What is a distinctive feature of the workshop’s approach?',options:['It treats speed as the only measure of success.','It asks unqualified owners to perform dangerous electrical work.','It refuses to discuss products that cannot be repaired.','It involves owners in learning while respecting safety limits.'],answer:3,explanation:'第三段强调解释安全步骤、让主人观察，并把需要专业资质的电气维修转介出去。',evidence:'Electrical repairs requiring professional qualifications were referred elsewhere.'}
    ]},
    {id:'r3',title:'When a Shortcut Becomes a Detour',tag:'仔细阅读',paragraphs:[
      'A university introduced an automated system to summarise lengthy course readings. Students welcomed the tool because it made unfamiliar topics appear manageable. During the first weeks, many reported that they could finish their preparation much faster. The teaching team, however, wanted to know whether this increased efficiency also improved understanding.',
      'In a classroom exercise, students first read a summary and then examined the original passage. They were asked to identify an exception that the summary had omitted. Some discovered that a confident statement in the shortened version depended on conditions explained only in the full text. The exercise was not intended to demonstrate that summaries were useless. It showed that a summary is a selection of information, not a replacement for every purpose.',
      'Teachers subsequently changed the preparation tasks. Instead of asking students merely to describe an author’s conclusion, they asked them to connect that conclusion to specific evidence and explain one limitation. Students could still use the automated tool, but they had to check the material supporting their answers.',
      'The result was a more deliberate use of technology. Summaries helped students decide where to begin, while close reading remained necessary for difficult claims. The teaching team concluded that a useful shortcut should save effort on navigation without removing the reasoning that the learning task is meant to develop.'
    ],questions:[
      {id:'r3q1',prompt:'What question concerned the teaching team?',options:['Whether students would refuse to use the new tool.','Whether faster preparation also produced better understanding.','Whether the original readings could be deleted permanently.','Whether summaries should always be longer than the source.'],answer:1,explanation:'第一段明确提出效率提高是否伴随理解提升。',evidence:'whether this increased efficiency also improved understanding'},
      {id:'r3q2',prompt:'What did the classroom exercise demonstrate?',options:['Summaries are always inaccurate and should be banned.','Exceptions are less important than confident statements.','A summary may omit conditions important for interpreting a claim.','Students understand a topic only if they avoid all digital tools.'],answer:2,explanation:'原文中的条件或例外可能在摘要中消失，因此摘要不能用于替代所有阅读目的。',evidence:'depended on conditions explained only in the full text'},
      {id:'r3q3',prompt:'What was the purpose of the revised preparation tasks?',options:['To require students to verify evidence and consider limitations.','To reward students solely for finishing more quickly.','To make students copy every sentence of the reading.','To prevent students from choosing where to start.'],answer:0,explanation:'新任务要求把结论与具体证据相连，并解释局限，推动核实与推理。',evidence:'connect that conclusion to specific evidence and explain one limitation'}
    ]}
  ];
  const listening = [
    {id:'l1',title:'A Better Campus Commute',tag:'长对话',sentences:[
      'Maya: I saw the survey about campus transport, but I was surprised that you asked about evening journeys.',
      'Daniel: Most previous surveys focused on morning classes, so they missed students who work in the laboratories late.',
      'Maya: I usually cycle home, although I take the bus when it rains.',
      'Daniel: Several students said the last bus leaves before their evening sessions finish.',
      'Maya: Then adding more buses at midday would not solve their problem.',
      'Daniel: Exactly, we are proposing a two-week trial of one later service before requesting a permanent change.',
      'Maya: How will you know whether the trial has worked?',
      'Daniel: We will count passengers and ask whether the new departure time actually fits their schedules.'
    ],questions:[
      {id:'l1q1',prompt:'Why did Daniel include evening journeys in the survey?',options:['All morning classes had been cancelled.','Students had requested cheaper bicycles.','Earlier surveys overlooked people staying late on campus.','The university had already ended its bus services.'],answer:2,explanation:'Daniel说以往调查主要关注早课，遗漏了实验室晚归的学生。',evidence:'they missed students who work in the laboratories late'},
      {id:'l1q2',prompt:'What does Daniel propose?',options:['A short trial of a later bus service.','An immediate permanent increase in midday buses.','A rule requiring every student to cycle.','A survey limited to students attending morning classes.'],answer:0,explanation:'提议先试行两周更晚的一班车，再申请永久调整。',evidence:'a two-week trial of one later service'},
      {id:'l1q3',prompt:'How will the trial be evaluated?',options:['Only by measuring the length of each route.','Only by comparing bicycle sales.','By asking drivers to guess student satisfaction.','By counting users and checking whether the time meets their needs.'],answer:3,explanation:'评价同时看乘客数和发车时间是否符合学生安排。',evidence:'count passengers and ask whether the new departure time actually fits their schedules'}
    ]},
    {id:'l2',title:'Why Retrieval Matters',tag:'讲座',sentences:[
      'Reading a familiar page can create a strong feeling of understanding, but that feeling does not always predict what you can remember later.',
      'One way to check your knowledge is to close the material and try to explain the main idea in your own words.',
      'This process, often called retrieval practice, makes gaps in your understanding easier to notice.',
      'If you cannot recall an answer, look it up, identify the missing connection, and try again after a delay.',
      'The delay matters because an answer repeated immediately may still be available in short-term memory.',
      'A useful study plan therefore combines new material with questions from earlier sessions.',
      'Such questions should test meaning and application as well as the recognition of familiar terms.',
      'Progress is better judged by what remains accessible over time than by how many pages have been opened.'
    ],questions:[
      {id:'l2q1',prompt:'What problem does the speaker identify at the beginning?',options:['Familiarity can be mistaken for lasting understanding.','Students cannot learn anything from reading.','All familiar texts contain incorrect information.','Understanding can only be measured by reading speed.'],answer:0,explanation:'开头区分熟悉感和之后实际能记住的内容，两者并不总一致。',evidence:'that feeling does not always predict what you can remember later'},
      {id:'l2q2',prompt:'Why should a learner wait before trying a question again?',options:['To avoid receiving any feedback.','To ensure that all details have been forgotten permanently.','To make the question appear more difficult than it is.','To reduce reliance on an answer still held in short-term memory.'],answer:3,explanation:'立即复述可能依赖短时记忆，延迟复测更能检验持续记忆。',evidence:'an answer repeated immediately may still be available in short-term memory'},
      {id:'l2q3',prompt:'Which study plan does the speaker recommend?',options:['Reading only new material every day.','Combining new learning with questions from previous sessions.','Counting opened pages as the main measure of success.','Practising recognition without considering meaning.'],answer:1,explanation:'讲者建议把新内容和之前学习过的内容交替测试，并关注含义与应用。',evidence:'combines new material with questions from earlier sessions'}
    ]}
  ];
  const writing = [
    {id:'wr1',title:'学习效率与真正掌握',prompt:'Directions: Write an essay on the importance of checking what we have learned. You should write at least 150 words but no more than 200 words. Use reasons and examples to support your view.（原创仿题）',model:'Finishing a chapter can feel like progress, yet it does not necessarily mean that we understand its content. Checking what we have learned is therefore an essential part of effective study.\n\nFirst, a short test makes hidden gaps visible. For example, a student may recognise an English word while reading but fail to use it in a new sentence. This difference helps the student decide what to practise next. Second, reviewing earlier material after a delay provides a more useful measure of learning than repeating an answer immediately. It shows whether knowledge remains available when the original explanation is no longer in front of us.\n\nTo make these checks productive, students should treat mistakes as information. After answering a question incorrectly, they can examine the reason, revise their understanding and try a related task later. Teachers can support this process by giving clear explanations instead of only a score.\n\nIn this way, assessment becomes part of learning itself. The goal is to build knowledge that can be recalled and applied, rather than merely to accumulate completed pages.',phrases:['Finishing … does not necessarily mean that …','This difference helps … decide what to …','The goal is to … rather than merely to …']},
    {id:'wr2',title:'校园中的可持续选择',prompt:'Directions: Write an essay discussing how universities can encourage students to make sustainable choices. You should write at least 150 words but no more than 200 words.（原创仿题）',model:'Universities can encourage sustainable behaviour most effectively by making responsible choices convenient and understandable. General appeals may raise awareness, but practical arrangements often determine what people actually do.\n\nOne useful step is to improve everyday services. Reliable campus buses and safe bicycle parking give students realistic alternatives to short car journeys. Similarly, clearly labelled recycling points reduce confusion about where different materials belong. These measures remove barriers that enthusiasm alone cannot overcome.\n\nAnother step is to involve students in evaluating proposed changes. A university could test a reusable-container scheme in one dining hall and collect feedback before expanding it. Students might identify problems with collection times or cleaning arrangements that planners have overlooked. Publishing the results would also help the community understand both the benefits and the limitations of the scheme.\n\nUltimately, sustainable campus life depends on the relationship between individual effort and institutional support. When universities provide accessible services, listen to users and explain their decisions, responsible behaviour becomes easier to maintain. Progress then grows out of everyday practice rather than occasional publicity campaigns.',phrases:['… most effectively by making …','These measures remove barriers that …','… depends on the relationship between … and …']}
  ];
  const translation = [
    {id:'t1',title:'社区图书馆',chinese:'近年来，一些城市的社区图书馆延长了开放时间，为居民提供更加便利的阅读空间。除了借阅图书，人们还可以参加讲座、交流学习经验。为了满足不同年龄群体的需要，图书馆不断改进服务。数字资源扩大了知识获取的渠道，但安静、友好的公共空间仍然具有独特价值。',sentences:[
      {zh:'近年来，一些城市的社区图书馆延长了开放时间，为居民提供更加便利的阅读空间。',en:'In recent years, community libraries in some cities have extended their opening hours to provide residents with more convenient spaces for reading.'},
      {zh:'除了借阅图书，人们还可以参加讲座、交流学习经验。',en:'In addition to borrowing books, people can attend lectures and exchange their learning experiences.'},
      {zh:'为了满足不同年龄群体的需要，图书馆不断改进服务。',en:'Libraries continue to improve their services to meet the needs of different age groups.'},
      {zh:'数字资源扩大了知识获取的渠道，但安静、友好的公共空间仍然具有独特价值。',en:'Digital resources have broadened access to knowledge, but quiet and welcoming public spaces still have a unique value.'}
    ],terms:['社区图书馆 · community library','延长开放时间 · extend opening hours','满足需要 · meet the needs','获取知识 · access to knowledge']},
    {id:'t2',title:'传统工艺与当代生活',chinese:'传统工艺不仅体现了劳动者的智慧，也记录了不同地区的生活方式。如今，越来越多的年轻设计师尝试将传统技艺与现代需求相结合。他们在尊重文化特色的同时，改进产品的功能和设计。这种探索有助于让传统工艺走进日常生活，并为相关从业者创造新的机会。',sentences:[
      {zh:'传统工艺不仅体现了劳动者的智慧，也记录了不同地区的生活方式。',en:'Traditional crafts not only reflect the wisdom of craftspeople but also record ways of life in different regions.'},
      {zh:'如今，越来越多的年轻设计师尝试将传统技艺与现代需求相结合。',en:'Today, a growing number of young designers are trying to combine traditional skills with modern needs.'},
      {zh:'他们在尊重文化特色的同时，改进产品的功能和设计。',en:'While respecting distinctive cultural features, they improve the functions and designs of products.'},
      {zh:'这种探索有助于让传统工艺走进日常生活，并为相关从业者创造新的机会。',en:'These efforts help bring traditional crafts into everyday life and create new opportunities for people working in the field.'}
    ],terms:['传统工艺 · traditional crafts','文化特色 · distinctive cultural features','将……相结合 · combine … with …','日常生活 · everyday life']}
  ];
  window.CET_CONTENT = {words,reading,listening,writing,translation};
})();
