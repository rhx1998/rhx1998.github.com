---
layout: post
title: TCO 2B
category: blog
description: BC题解
---
## B.LineColoring
关键在于要能猜到，只需要三种颜色就能满足要求。如果猜到了，就随意贪心了。
```
#line 5 "LineColoring.cpp"  
#include <cstdlib>
#include <cctype>
#include <cstring>
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <vector>
#include <string>
#include <iostream>
#include <sstream>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <fstream>
#include <numeric>
#include <iomanip>
#include <bitset>
#include <list>
#include <stdexcept>
#include <functional>
#include <utility>
#include <ctime>
using namespace std;
typedef long long LL;
typedef unsigned long long ULL;
#define MEM(a,b) memset((a),(b),sizeof(a))
const LL INF = 1e9 + 7;
const int N = 1e3 + 10;
int flag[N];
class LineColoring
{
public:
	int solve2(vector<int> &v)
	{
		if (v.size() == 1) return v[0];
		int ans1 = 0;
		int ans2 = 0;
		for (int i = 0; i < v.size(); i++)
		{
			if (i & 1) ans1 = max(ans1, v[i]);
			else ans2 = max(ans2, v[i]);
		}
		return ans1 + ans2;
	}
	int minCost(vector <int> v)
	{
		//$CARETPOSITION$  
		vector<pair<int, int>> vp;
		int n = v.size();
		for (int i = 0; i < n; i++) vp.push_back({ v[i],i });
		sort(vp.rbegin(), vp.rend());
		if (vp.size() == 1)
		{
			return v[0];
		}
		int o = -1;
		int ans = INF;
		for (int i = 1; i < n; i++)
		{
			int res = vp[i].first + vp[0].first;
			vector<int> tmp;
			for (int j = 0; j < i; j++) tmp.push_back(vp[j].second);
			sort(tmp.begin(), tmp.end());
			int maxv = 0;
			for (int j = 0; j + 1 < tmp.size(); j++)
			{
				int l = tmp[j];
				int r = tmp[j + 1];
				if (l + 1 == r)
				{
					res = INF;
					maxv = 0;
					break;
				}
				if ((r - l) % 2 == 0) continue;
				int minv = INF;
				for (int k = l + 1; k < r; k++) minv = min(minv, v[k]);
				maxv = max(maxv, minv);
			}
			res += maxv;
			ans = min(ans, res);
		}
		return min(ans, solve2(v));
	}


};




// Powered by FileEdit
// Powered by TZTester 1.01 [25-Feb-2003]
// Powered by CodeProcessor
```
## C.SquareFreeSet
任意一个数字，如果他的质因数个数全是偶数。那么显然是一个完全平方数。
我们可以考虑到$f[k]$表示数字$k$,所有数量为奇数的质因数之积。则两个数之积是完全平方数的充要条件为
$f[i] == f[j]$
那么题目便转化为，要求集合里的所有元素，$f[k]$均不相同。
我们可以考虑：
1.从原点对每个原始点建立费用为$0$, 流量为$1$的边。
2.对每个原点$x$， 我们对$[x-500, x+500]$的点建立一条流量为1， 费用为
3.从每个可能到达的点，对汇点建立费用为$0$, 流量为$1$的边。
最后跑一个最小费用最大流就好了
```
// BEGIN CUT HERE  

// END CUT HERE  
#line 5 "SquareFreeSet.cpp"  
#include <cstdlib>
#include <cctype>
#include <cstring>
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <vector>
#include <string>
#include <iostream>
#include <sstream>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <fstream>
#include <numeric>
#include <iomanip>
#include <bitset>
#include <list>
#include <stdexcept>
#include <functional>
#include <utility>
#include <ctime>
using namespace std;
typedef long long LL;
typedef unsigned long long ULL;
#define MEM(a,b) memset((a),(b),sizeof(a))
const LL INF = 1e9 + 7;
const int N = 2e5 + 10;
const int M = 1e6 + 10;
struct Node
{
	int x, y, c, r, pre;
};
class Graph
{
public:
	int top[N];
	Node e[M];
	int n;
	void init(int sz = N)
	{
		n = 0;
		memset(top, -1, sizeof(int)*sz);
	}
	void addEdge(int x, int y, int c, int w)
	{
		e[n] = Node{ x,y,c,w,top[x] };
		top[x] = n++;
		e[n] = Node{ y,x,-c,0,top[y] };
		top[y] = n++;
	}
	Node& operator [] (int i)
	{
		return e[i];
	}
} g;
int s, t;
int dis[N];
int delta[N];
int in[N];
int pre[N];
bool bfs(int sz = N)
{
	deque<int> q;
	q.push_back(s);
	memset(in, 0, sizeof(int)*sz);
	memset(dis, 0x3f, sizeof(int)*sz);
	int inf = dis[0];
	in[s] = 1;
	dis[s] = 0;
	delta[s] = INF;
	pre[s] = -1;
	while (!q.empty())
	{
		int x = q.front();
		q.pop_front();
		in[x] = 0;
		for (int i = g.top[x]; ~i; i = g[i].pre)
		{
			int y = g[i].y;
			int r = g[i].r;
			int c = g[i].c;
			if (r > 0 && dis[y] > dis[x] + c)
			{
				dis[y] = dis[x] + c;
				delta[y] = min(delta[x], r);
				pre[y] = i;
				if (!in[y])
				{
					in[y] = 1;
					if (!q.empty() && dis[y] <= dis[q.front()]) q.push_front(y);
					else q.push_back(y);
				}
			}
		}
	}
	return dis[t] != inf;
}
void solve(int &flow, int &cost, int sz = N)
{
	flow = 0;
	cost = 0;
	while (bfs(sz))
	{
		int d = delta[t];
		flow += d;
		cost += d * dis[t];
		int x = t;
		while (pre[x] != -1)
		{
			int o = pre[x];
			g[o].r -= d;
			g[o ^ 1].r += d;
			x = g[o].x;
		}
	}
}
const int K = 1e6 + 1010;
int a[K];
int b[K];
class SquareFreeSet
{
public:
	int initok;
	void init()
	{
		if (initok)
			return;
		initok = 1;
		MEM(b, 0);
		for (int i = 1; i < K; i++) a[i] = i;
		for (int i = 2; i < K; i++)
		{
			if (b[i]) continue;
			for (int j = i; j < K; j += i)
			{
				b[j] = 1;
				if (1LL * i*i >= K) continue;
				while (a[j] % (i*i) == 0) a[j] /= i * i;
			}
		}
	}
	SquareFreeSet()
	{
		initok = 0;
	}
	int findCost(vector <int> v)
	{
		//$CARETPOSITION$  
		init();
		int n = v.size();
		int m = n;
		map<int, int> mc;
		for (auto &x : v)
		{
			int l = max(1, x - 500);
			int r = min(K - 1, x + 500);
			for (int i = l; i <= r; i++)
			{
				if (!mc.count(a[i])) mc[a[i]] = ++m;
			}
		}
		s = 0, t = m + 1;
		g.init(t + 1);
		for (int i = 1; i <= n; i++) g.addEdge(s, i, 0, 1);
		for (int i = n + 1; i <= m; i++) g.addEdge(i, t, 0, 1);
		for (int i = 0; i < n; i++)
		{
			int x = i + 1;
			int l = max(1, v[i] - 500);
			int r = min(K - 1, v[i] + 500);
			for (int j = l; j <= r; j++)
			{
				int y = mc[a[j]];
				g.addEdge(x, y, abs(j - v[i]), 1);
			}
		}
		int flow, cost;
		solve(flow, cost, t + 1);
		cout << n << ' ' << flow << endl;
		return cost;
	}

	// BEGIN CUT HERE
public:
	void run_test(int Case) { if ((Case == -1) || (Case == 0)) test_case_0(); if ((Case == -1) || (Case == 1)) test_case_1(); if ((Case == -1) || (Case == 2)) test_case_2(); if ((Case == -1) || (Case == 3)) test_case_3(); if ((Case == -1) || (Case == 4)) test_case_4(); if ((Case == -1) || (Case == 5)) test_case_5(); if ((Case == -1) || (Case == 6)) test_case_6(); }
private:
	template <typename T> string print_array(const vector<T> &V) { ostringstream os; os << "{ "; for (typename vector<T>::const_iterator iter = V.begin(); iter != V.end(); ++iter) os << '\"' << *iter << "\","; os << " }"; return os.str(); }
	void verify_case(int Case, const int &Expected, const int &Received) { cerr << "Test Case #" << Case << "..."; if (Expected == Received) cerr << "PASSED" << endl; else { cerr << "FAILED" << endl; cerr << "\tExpected: \"" << Expected << '\"' << endl; cerr << "\tReceived: \"" << Received << '\"' << endl; } }
	void test_case_0() {
		int Arr0[] = { 1,2,1,2 }
		; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 5; verify_case(0, Arg1, findCost(Arg0));
	}
	void test_case_1() { int Arr0[] = { 7,7,7 }; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 2; verify_case(1, Arg1, findCost(Arg0)); }
	void test_case_2() { int Arr0[] = { 4,5,6,47 }; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 0; verify_case(2, Arg1, findCost(Arg0)); }
	void test_case_3() {
		int Arr0[] = { 1,10,1,1,1,1,10 }
		; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 13; verify_case(3, Arg1, findCost(Arg0));
	}
	void test_case_4() {
		int Arr0[] = { 4,5,6,7,8,9,10,11,12,13,14,15,16,17,1,1,1,1,1,1,1,1,1,1,1,1,1,1 }
		; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 443; verify_case(4, Arg1, findCost(Arg0));
	}
	void test_case_5() { int Arr0[] = { 1000000 }; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 0; verify_case(5, Arg1, findCost(Arg0)); }
	void test_case_6() {
		int Arr0[] = { 9450,7098,6048,1050,672,8232,5028,
672,672,42,42,42,42,42,9450,6048,
3402,3402,2688,9450,7098,6048,1050,
672,8232,5028,672,672,9450,6048,3402 }; vector <int> Arg0(Arr0, Arr0 + (sizeof(Arr0) / sizeof(Arr0[0]))); int Arg1 = 42; verify_case(6, Arg1, findCost(Arg0));
	}

	// END CUT HERE

};

// BEGIN CUT HERE  
int main()
{
	SquareFreeSet ___test;
	___test.run_test(-1);
}
// END CUT HERE  
```