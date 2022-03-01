60分代码

```c++
#include <iostream>
#include <vector>
using namespace std;

class IP {
	public:
		int address;
		vector<int>hasAllocate;
		string state;
		string domainHost;
		int endTime;
		IP() {
			this->state = "未分配";
			this->domainHost = "";
			this->endTime = 0;
			this->address = -1;
		}
		IP(int address, int endTime, string state, string domainHost) {
			this->address = address;
			this->endTime = endTime;
			this->state = state; 
			this->domainHost = domainHost;
		}
		
		void InitIp() {
			this->domainHost = "";
			this->state = "未分配";
			this->endTime = 0;
		}
		
		void overTime() {
			if(this->state == "待分配") {
				this->state = "未分配";
				this->InitIp();
			} else {
				this->state = "过期";
				this->endTime = 0;
			}
		}
		
		void check(int t) {
			if(t >= this->endTime && this->endTime) {
				if(this->state == "占用")
					this->state = "过期";
				else if(this->state == "待分配")
					this->state = "未分配";
			}
		}
};

class DHCPInfo {
	public:
		string sender;
		string reciever;
		string type;
		int address;
		int endTime;
		DHCPInfo(string sender, string reciever, string type, int address, int endTime) {
			this->sender = sender;
			this->reciever = reciever;
			this->type = type;
			this->address = address;
			this->endTime = endTime;
		}
};

class DHCP {
	public:
		int poolSize;
		int Tdef;
		int TMax;
		int TMin;
		string H;
		vector<IP*>ip;
		DHCP() {
			
		}
		DHCP(int poolSize, int Tdef, int TMax, int TMin, string H) {
			this->poolSize = poolSize;
			this->InitDHCP();
			this->Tdef = Tdef;
			this->TMax = TMax;
			this->TMin = TMin;
			this->H = H;
		}
		
		void InitDHCP() {
			for(int i = 1; i <= this->poolSize; i ++)
				this->ip.push_back(new IP(i, 0, "未分配", ""));
		}
		
		void setEndTime(IP* ip, int t, int endTime) {
			if(endTime == 0)
				ip->endTime = t + this->Tdef;
			else {
				if(endTime >= this->TMin + t && endTime <= this->TMax + t)
					ip->endTime = endTime;
				else if(endTime < this->TMin + t)
					ip->endTime = t + this->TMin;
				else
					ip->endTime = t + this->TMax;
			}
		}
		
		void getInfo(int t, DHCPInfo* info) {
			if(info->reciever != this->H && info->reciever != "*" && info->type != "REQ") 
				return;
			if(info->type != "DIS" && info->type != "REQ")
				return;
			if((info->reciever == "*" && info->type != "DIS") || (info->reciever == this->H && info->type == "DIS"))
				return;
				
			if(info->type == "DIS") {
				int size = this->ip.size();
				IP* ip = NULL;
				for(int i = 0; i < size; i ++) 
					if(this->ip[i]->domainHost == info->sender) {
						ip = this->ip[i];
						break;
					}
				if(ip == NULL) {
					for(int i = 0; i < size; i ++) 
						if(this->ip[i]->state == "未分配") {
							ip = this->ip[i];
							break;
						}
					if(ip == NULL)
						for(int i = 0; i < size; i ++) 
							if(this->ip[i]->state == "过期") {
								ip = this->ip[i];
								break;
							}
					if(ip == NULL)
						return;
				} 
				ip->state = "待分配";
				ip->domainHost = info->sender;
				this->setEndTime(ip, t, info->endTime);
				
				this->emitOffer(ip->address, info->sender, ip->endTime);
			} else if(info->type == "REQ") {
				if(info->reciever != this->H) {
					int size = this->ip.size();
					for(int i = 0; i < size; i ++) 
						if(this->ip[i]->domainHost == info->sender) {
							this->ip[i]->state = "未分配";
							this->ip[i]->domainHost = "";
							this->ip[i]->endTime = 0;
							return;
						}
				}
				
				int size = this->ip.size();
				bool inPool = false;
				for(int i = 0; i < size; i ++)
					if(this->ip[i]->address == info->address && this->ip[i]->domainHost == info->sender) {
						inPool = true;
						break;
					}
				if(inPool == false) {
					this->emitNak(info->sender, info->address);
					return;
				}
				
				IP* ip;
				for(int i = 0; i < size; i ++)
					if(this->ip[i]->address == info->address) {
						ip = this->ip[i];
						break;
					}
				ip->state = "占用";
				
				this->setEndTime(ip, t, info->endTime);
				this->emitAck(info->sender, ip->address, ip->endTime);
			}
		}
		
		void checkEndTime(int t) {
			int size = this->ip.size();
			for(int i = 0; i < size; i ++)
				this->ip[i]->check(t);
		}
		
		void emitOffer(int address, string hostName, int endTime) {
			cout << this->H << " " << hostName << " OFR " << address << " " << endTime<< endl;
		}
		
		void emitNak(string hostName, int address) {
			cout << this->H << " " << hostName << " NAK " << address << " " << 0 << endl;
		}
		
		void emitAck(string hostName, int address, int endTime) {
			cout << this->H << " " << hostName << " ACK " << address << " " << endTime << endl;
		}
};

int main() {
	int N, Tdef, TMin, TMax;
	string H;
	cin >> N >> Tdef >> TMax >> TMin >> H;
	DHCP* D = new DHCP(N, Tdef, TMax, TMin, H); 
	
	int n, t, address, endTime;
	string sender, reciever, type;
	cin >> n;
	for(int i = 0; i < n; i ++) {
		cin >> t >> sender >> reciever >> type >> address >> endTime;
		D->checkEndTime(t);
		D->getInfo(t, new DHCPInfo(sender, reciever, type, address, endTime));
	}
}
```



通过此题学习到的内容：

第三题一般是题面描述很长的模拟题，在4000字左右。像脉冲神经网络，登机牌条码这些也都是长模拟，吸取了这两道题的经验，在做本题时，在读题过程中就建立数据结构。重要的是最后的状态图也需要表示，虽然不是文字说明，但是涉及到了未提及的计时器操作