import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ResearchPaperAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paper Analysis: Ethical Implications of AI in Healthcare</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="findings">Key Findings</TabsTrigger>
            <TabsTrigger value="citations">Citations</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4 space-y-4">
            <p className="text-slate-600 dark:text-slate-300">
              This paper examines the ethical considerations surrounding the implementation of artificial intelligence
              in healthcare settings. The authors conduct a comprehensive review of current AI applications in clinical
              decision support, diagnostics, and patient monitoring, highlighting both the potential benefits and
              ethical challenges.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              The research identifies four primary ethical concerns: privacy and data security, algorithmic bias and
              fairness, transparency and explainability, and questions of autonomy and responsibility. Through case
              studies and stakeholder interviews, the authors develop a framework for ethical AI governance in
              healthcare institutions.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              The paper concludes that while AI offers significant potential to improve healthcare outcomes and
              efficiency, its implementation must be guided by robust ethical frameworks and ongoing stakeholder
              engagement to ensure that these technologies serve to enhance rather than undermine patient care and
              medical ethics.
            </p>
          </TabsContent>
          <TabsContent value="methodology" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Research Design</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Mixed-methods approach combining literature review, case studies, and qualitative interviews with
                healthcare professionals, AI developers, ethicists, and patient advocates.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Data Collection</h3>
              <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
                <li>Systematic review of 87 peer-reviewed articles on AI in healthcare (2018-2024)</li>
                <li>Analysis of 12 case studies of AI implementation in clinical settings</li>
                <li>In-depth interviews with 35 stakeholders across 4 countries</li>
                <li>Review of existing regulatory frameworks and guidelines</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Analysis</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Thematic analysis of qualitative data using NVivo software. Comparative analysis of case studies to
                identify common ethical challenges and successful governance approaches.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="findings" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Privacy and Data Security</h3>
              <p className="text-slate-600 dark:text-slate-300">
                AI systems require vast amounts of sensitive patient data, raising concerns about consent, data
                ownership, and security vulnerabilities. The study found inconsistent approaches to data governance
                across institutions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Algorithmic Bias</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Analysis revealed evidence of bias in several healthcare AI systems, particularly affecting
                underrepresented populations. Most institutions lacked systematic approaches to identifying and
                mitigating bias.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Transparency</h3>
              <p className="text-slate-600 dark:text-slate-300">
                "Black box" AI systems pose challenges for clinical accountability and patient autonomy. Stakeholders
                emphasized the need for explainable AI in high-stakes medical decisions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Governance Framework</h3>
              <p className="text-slate-600 dark:text-slate-300">
                The paper proposes a multi-level governance framework incorporating: institutional ethics committees,
                ongoing algorithmic auditing, stakeholder participation, and integration with existing medical ethics
                principles.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="citations" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Key Citations</h3>
              <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-2">
                <li>
                  <p className="font-medium">Beauchamp, T. L., & Childress, J. F. (2019)</p>
                  <p className="text-sm">Principles of Biomedical Ethics (8th ed.). Oxford University Press.</p>
                </li>
                <li>
                  <p className="font-medium">Chen, I. Y., Szolovits, P., & Ghassemi, M. (2021)</p>
                  <p className="text-sm">
                    Can AI Help Reduce Disparities in General Medical and Mental Health Care? AMA Journal of Ethics,
                    23(2), E111-116.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Gerke, S., Minssen, T., & Cohen, G. (2020)</p>
                  <p className="text-sm">
                    Ethical and legal challenges of artificial intelligence-driven healthcare. Artificial Intelligence
                    in Healthcare, 295-336.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Mittelstadt, B. D., & Floridi, L. (2016)</p>
                  <p className="text-sm">
                    The Ethics of Big Data: Current and Foreseeable Issues in Biomedical Contexts. Science and
                    Engineering Ethics, 22(2), 303-341.
                  </p>
                </li>
                <li>
                  <p className="font-medium">World Health Organization. (2023)</p>
                  <p className="text-sm">
                    Ethics and governance of artificial intelligence for health: WHO guidance. World Health
                    Organization.
                  </p>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
