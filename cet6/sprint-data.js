'use strict';
// Familiar checks measure retention; Day 14 uses an untrained paper for transfer.
window.SPRINT_DAYS = [
  {
    "day": 1,
    "title": "找到起点",
    "focus": "先做真实小基线，记录失分原因。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d01-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d01-paper-2",
        "label": "听力第1–5题 · 起点小基线",
        "kind": "paper",
        "minutes": 20,
        "route": "listening",
        "description": "2024年6月第一套：先听后答，再对照原图解析重听错误部分。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 5,
        "required": 5,
        "from": 1,
        "paperId": "202406-1"
      },
      {
        "id": "d01-paper-3",
        "label": "阅读第46–50题 · 起点小基线",
        "kind": "paper",
        "minutes": 25,
        "route": "reading",
        "description": "2024年6月第一套：独立作答后，在原卷标出每题依据，再核对解析。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 50,
        "required": 5,
        "from": 46,
        "paperId": "202406-1"
      },
      {
        "id": "d01-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d01-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 2,
    "title": "听清信息与限定词",
    "focus": "听力先抓人物、问题和原因；翻译先保证信息完整。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d02-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d02-paper-2",
        "label": "听力第6–10题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "listening",
        "description": "2024年6月第一套：先听后答，再对照原图解析重听错误部分。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 10,
        "required": 5,
        "from": 6,
        "paperId": "202406-1"
      },
      {
        "id": "d02-translation-3",
        "label": "真题翻译 · 完整表达",
        "kind": "translation",
        "minutes": 25,
        "route": "translation",
        "description": "使用原卷Part IV整段翻译。先分句确定主干，再独立翻译；至少写40个英文词，并逐句检查遗漏、时态、搭配。对照参考译文后记录1处修改；字数只是最低完成检查。",
        "required": 40
      },
      {
        "id": "d02-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d02-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 3,
    "title": "用语法筛选词性",
    "focus": "选词填空先判词性，再结合句意；写作先搭清楚结构。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d03-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d03-paper-2",
        "label": "阅读第26–30题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "reading",
        "description": "2024年6月第一套：独立作答后，在原卷标出每题依据，再核对解析。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 30,
        "required": 5,
        "from": 26,
        "paperId": "202406-1"
      },
      {
        "id": "d03-writing-3",
        "label": "真题写作 · 独立成文",
        "kind": "writing",
        "minutes": 25,
        "route": "writing",
        "description": "使用原卷Part I题目，完成150–200词。先用5分钟列出中心论点与两个论据，再完成正文。对照参考范文并完成自查；字数达标不代表写作水平已达标。",
        "required": 150
      },
      {
        "id": "d03-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d03-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 4,
    "title": "把漏听变成可定位的问题",
    "focus": "将没听懂的内容拆成词汇、连读或逻辑问题。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d04-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d04-paper-2",
        "label": "听力第11–15题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "listening",
        "description": "2024年6月第一套：先听后答，再对照原图解析重听错误部分。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 15,
        "required": 5,
        "from": 11,
        "paperId": "202406-1"
      },
      {
        "id": "d04-translation-3",
        "label": "真题翻译 · 完整表达",
        "kind": "translation",
        "minutes": 25,
        "route": "translation",
        "description": "使用原卷Part IV整段翻译。先分句确定主干，再独立翻译；至少写40个英文词，并逐句检查遗漏、时态、搭配。对照参考译文后记录1处修改；字数只是最低完成检查。",
        "required": 40
      },
      {
        "id": "d04-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d04-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 5,
    "title": "让搭配回到语境",
    "focus": "完成选词填空后，检查整句搭配与全文逻辑。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d05-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d05-paper-2",
        "label": "阅读第31–40题 · 填空与匹配",
        "kind": "paper",
        "minutes": 20,
        "route": "reading",
        "description": "2024年6月第一套：独立完成31–35题选词填空与36–40题长篇匹配，逐题记录词性判断或定位依据。10题至少答对8题；先保留首次成绩，复练再达标。",
        "to": 40,
        "required": 10,
        "from": 31,
        "paperId": "202406-1"
      },
      {
        "id": "d05-writing-3",
        "label": "真题写作 · 独立成文",
        "kind": "writing",
        "minutes": 25,
        "route": "writing",
        "description": "使用原卷Part I题目，完成150–200词。检查每个主体段是否有具体例子，删去空泛句。对照参考范文并完成自查；字数达标不代表写作水平已达标。",
        "required": 150
      },
      {
        "id": "d05-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d05-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 6,
    "title": "跟住篇章的转折",
    "focus": "听力记录观点、例子和转折，不逐词翻译。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d06-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d06-paper-2",
        "label": "听力第16–20题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "listening",
        "description": "2024年6月第一套：先听后答，再对照原图解析重听错误部分。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 20,
        "required": 5,
        "from": 16,
        "paperId": "202406-1"
      },
      {
        "id": "d06-translation-3",
        "label": "真题翻译 · 完整表达",
        "kind": "translation",
        "minutes": 25,
        "route": "translation",
        "description": "使用原卷Part IV整段翻译。先分句确定主干，再独立翻译；至少写40个英文词，并逐句检查遗漏、时态、搭配。对照参考译文后记录1处修改；字数只是最低完成检查。",
        "required": 40
      },
      {
        "id": "d06-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d06-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 7,
    "title": "第一次阶段复盘",
    "focus": "重做已练听读题，检验延迟保持；熟题阶段测验不代表陌生题水平。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d07-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d07-paper-2",
        "label": "听力第1–15题 · 熟题阶段小测",
        "kind": "paper",
        "minutes": 25,
        "route": "listening",
        "description": "2024年6月第一套：遮住原答案，独立完成第1–15题，再核对解析。15题至少答对12题。保留本次首次成绩，用于检查延迟保持，不能据此预测六级分数。",
        "to": 15,
        "required": 15,
        "from": 1,
        "paperId": "202406-1"
      },
      {
        "id": "d07-paper-3",
        "label": "阅读第26–40题 · 熟题阶段小测",
        "kind": "paper",
        "minutes": 25,
        "route": "reading",
        "description": "2024年6月第一套：遮住原答案，独立完成第26–40题，再核对解析。15题至少答对12题。保留本次首次成绩，用于检查延迟保持，不能据此预测六级分数。",
        "to": 40,
        "required": 15,
        "from": 26,
        "paperId": "202406-1"
      },
      {
        "id": "d07-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 10,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d07-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 8,
    "title": "抓住讲座主线",
    "focus": "先判断主题和段落关系，再核对细节。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d08-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d08-paper-2",
        "label": "听力第21–25题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "listening",
        "description": "2024年6月第一套：先听后答，再对照原图解析重听错误部分。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 25,
        "required": 5,
        "from": 21,
        "paperId": "202406-1"
      },
      {
        "id": "d08-writing-3",
        "label": "真题写作 · 独立成文",
        "kind": "writing",
        "minutes": 25,
        "route": "writing",
        "description": "使用原卷Part I题目，完成150–200词。独立重写，不看旧稿；完成后比较论证和语言问题。对照参考范文并完成自查；字数达标不代表写作水平已达标。",
        "required": 150
      },
      {
        "id": "d08-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d08-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 9,
    "title": "定位与同义替换",
    "focus": "长篇匹配先标人名、数字和核心概念，再找改写。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d09-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d09-paper-2",
        "label": "阅读第36–40题 · 熟题定位复测",
        "kind": "paper",
        "minutes": 20,
        "route": "reading",
        "description": "2024年6月第一套：独立作答后，在原卷标出每题依据，再核对解析。5题至少答对4题。先保留首次成绩，复练再达标。 本组在第5天练过，本次着重检验延迟保持与定位依据，不是未见题测验。",
        "to": 40,
        "required": 5,
        "from": 36,
        "paperId": "202406-1"
      },
      {
        "id": "d09-translation-3",
        "label": "真题翻译 · 完整表达",
        "kind": "translation",
        "minutes": 25,
        "route": "translation",
        "description": "使用原卷Part IV整段翻译。先分句确定主干，再独立翻译；至少写40个英文词，并逐句检查遗漏、时态、搭配。对照参考译文后记录1处修改；字数只是最低完成检查。",
        "required": 40
      },
      {
        "id": "d09-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d09-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 10,
    "title": "用证据排除干扰",
    "focus": "继续长篇匹配，每道题都写出定位段落与依据。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d10-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d10-paper-2",
        "label": "阅读第41–45题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "reading",
        "description": "2024年6月第一套：独立作答后，在原卷标出每题依据，再核对解析。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 45,
        "required": 5,
        "from": 41,
        "paperId": "202406-1"
      },
      {
        "id": "d10-writing-3",
        "label": "真题写作 · 独立成文",
        "kind": "writing",
        "minutes": 25,
        "route": "writing",
        "description": "使用原卷Part I题目，完成150–200词。重点检查衔接、指代、主谓一致和时态。对照参考范文并完成自查；字数达标不代表写作水平已达标。",
        "required": 150
      },
      {
        "id": "d10-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d10-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 11,
    "title": "拆开长句再判断",
    "focus": "仔细阅读先找主干，区分原文事实与选项推断。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d11-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d11-paper-2",
        "label": "阅读第51–55题 · 真题分段练习",
        "kind": "paper",
        "minutes": 20,
        "route": "reading",
        "description": "2024年6月第一套：独立作答后，在原卷标出每题依据，再核对解析。5题至少答对4题。先保留首次成绩，复练再达标。",
        "to": 55,
        "required": 5,
        "from": 51,
        "paperId": "202406-1"
      },
      {
        "id": "d11-translation-3",
        "label": "真题翻译 · 完整表达",
        "kind": "translation",
        "minutes": 25,
        "route": "translation",
        "description": "使用原卷Part IV整段翻译。先分句确定主干，再独立翻译；至少写40个英文词，并逐句检查遗漏、时态、搭配。对照参考译文后记录1处修改；字数只是最低完成检查。",
        "required": 40
      },
      {
        "id": "d11-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d11-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 12,
    "title": "减少熟悉感造成的误判",
    "focus": "隔几天重听已学段落，先作答再看原文。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d12-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d12-paper-2",
        "label": "听力第6–10题 · 熟题延迟复测",
        "kind": "paper",
        "minutes": 20,
        "route": "listening",
        "description": "2024年6月第一套：先听后答，再对照原图解析重听错误部分。5题至少答对4题。先保留首次成绩，复练再达标。本组是已练过的题，只衡量延迟保持，不能预测陌生试卷成绩。",
        "to": 10,
        "required": 5,
        "from": 6,
        "paperId": "202406-1"
      },
      {
        "id": "d12-writing-3",
        "label": "真题写作 · 独立成文",
        "kind": "writing",
        "minutes": 25,
        "route": "writing",
        "description": "使用原卷Part I题目，完成150–200词。用25分钟独立成文，最后5分钟集中检查拼写与语法。对照参考范文并完成自查；字数达标不代表写作水平已达标。",
        "required": 150
      },
      {
        "id": "d12-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d12-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 13,
    "title": "把错题变成可复用的方法",
    "focus": "重做选词填空，解释词性、搭配和排除依据。",
    "minutes": 75,
    "tasks": [
      {
        "id": "d13-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "description": "完成7个词的测验，先复习到期词，再学新词；正确率至少80%。当天重复答对不提高掌握等级。",
        "required": 7
      },
      {
        "id": "d13-paper-2",
        "label": "阅读第31–35题 · 熟题延迟复测",
        "kind": "paper",
        "minutes": 20,
        "route": "reading",
        "description": "2024年6月第一套：独立作答后，在原卷标出每题依据，再核对解析。5题至少答对4题。先保留首次成绩，复练再达标。本组是已练过的题，只衡量延迟保持，不能预测陌生试卷成绩。",
        "to": 35,
        "required": 5,
        "from": 31,
        "paperId": "202406-1"
      },
      {
        "id": "d13-translation-3",
        "label": "真题翻译 · 完整表达",
        "kind": "translation",
        "minutes": 25,
        "route": "translation",
        "description": "使用原卷Part IV整段翻译。先分句确定主干，再独立翻译；至少写40个英文词，并逐句检查遗漏、时态、搭配。对照参考译文后记录1处修改；字数只是最低完成检查。",
        "required": 40
      },
      {
        "id": "d13-review-4",
        "label": "到期错题 · 重新作答",
        "kind": "review",
        "minutes": 15,
        "route": "mistakes",
        "description": "处理当前到期错题，遮住答案独立重做，优先最多3题；暂时无到期错题时由系统检查队列为空，不制造假错题。未达掌握条件的题保留在队列中。"
      },
      {
        "id": "d13-reflection-5",
        "label": "一分钟复盘 · 留下证据",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "description": "写下今天一个具体收获和仍不会的一点，至少20字。用题号、定位句或修改实例说明，不用“学了很久”代替效果。",
        "required": 20
      }
    ]
  },
  {
    "day": 14,
    "title": "未见卷结营检测",
    "focus": "使用未纳入前13天训练的2025年6月第一套，独立检测听读迁移能力；只报告实际正确率，不作710分预测。",
    "minutes": 85,
    "tasks": [
      {
        "id": "d14-vocab-1",
        "label": "词汇主动回忆 · 7词",
        "kind": "vocab",
        "minutes": 10,
        "route": "vocab",
        "required": 7,
        "description": "完成7个到期或薄弱词测验；正确率至少80%。保持复习节奏，不在结营日突击大量新词。"
      },
      {
        "id": "d14-paper-2",
        "label": "未见卷听力 · 第1–25题",
        "kind": "paper",
        "minutes": 30,
        "route": "listening",
        "paperId": "202506-1",
        "from": 1,
        "to": 25,
        "required": 25,
        "description": "2025年6月第一套：完整播放配套音频，在30分钟内独立作答，不看答案或解析。保存第一次提交成绩；复练成绩另记，不能覆盖首次检测结果。"
      },
      {
        "id": "d14-paper-3",
        "label": "未见卷阅读 · 第26–55题",
        "kind": "paper",
        "minutes": 40,
        "route": "reading",
        "paperId": "202506-1",
        "from": 26,
        "to": 55,
        "required": 30,
        "description": "2025年6月第一套：用40分钟独立完成选词填空、长篇匹配和仔细阅读，不看解析。保存第一次提交成绩；系统按各题型正确率指出下一步补强项，不直接换算正式六级成绩。"
      },
      {
        "id": "d14-reflection-4",
        "label": "结营复盘 · 明确下一步",
        "kind": "reflection",
        "minutes": 5,
        "route": "mistakes",
        "required": 20,
        "description": "至少20字，写下本次未见题的一个进步、一类失分与接下来的补强安排。14天完成不等于保证过级；以实际检测结果决定后续复习。"
      }
    ]
  }
];
