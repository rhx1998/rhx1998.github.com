---
layout: post
title: Codeforces Round 485 Div1
category: blog
description: 为了写数模而错过的上分场
---
## A.Fair
对每种货物进行一次bfs，更新每个城镇对每种货物的花费。最后每个城镇找到最少的k种货物即可。
```
/*
 * Author:  JiangYu
 * Created Time:  2018/5/30 22:43:59
 * File Name: A.cpp
 */
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define MP make_pair
#define PB push_back
#define X first
#define Y second
#define FI first
#define SE second
#define inf 0x3f3f3f3f
#define FOR(i,a,b) for(int i = a; i <= b; ++i)
#define FORD(i,a,b) for(int i = b; i >= a; --i)
#define ALL(x) x.begin(),x.end()
#define REP(i,a) for(int i = 0; i < a; ++i)
#define DEP(i,a) for(int i = a-1; i >= 0; --i)
#define CLR(a) memset(a, 0, sizeof a)
const int N = 1e5 + 1024;
int dist[N][120];
int a[N];
bool used[N];
vector<int> g[N], K[120];
queue<int> que;
void bfs(int i) {
    for(auto x : K[i]) que.push(x), used[x] = 1;
    while(!que.empty() ) {
        int u = que.front();
        que.pop();
        for(auto v : g[u]) if(used[v] == 0){
            used[v] = 1;
            dist[v][i] = dist[u][i]+1;
            que.push(v);
        }
    }
}
int main() {
    int n, m, k, s;
    scanf("%d%d%d%d", &n, &m, &k, &s);
    for(int i = 1; i <= n; ++i) {
        scanf("%d", &a[i]);
        K[a[i]].PB(i);
    }
    for(int i = 1; i <= m; ++i) {
        int u, v;
        scanf("%d%d", &u, &v);
        g[u].PB(v);
        g[v].PB(u);
    }
    for(int i = 1; i <= k; ++i) {
        CLR(used);
        bfs(i);
    }
    for(int i = 1; i <= n; ++i) {
        sort(dist[i]+1, dist[i]+1+k);
        int ans = 0;
        for(int j = 1; j <= s; ++j)
            ans += dist[i][j];
        printf("%d ", ans);
    }
    return 0;
}

```
## B.Petr and Permutations
考虑交换次数的奇偶性即可
```
/*
 * Author:  JiangYu
 * Created Time:  2018/5/31 14:07:38
 * File Name: B.cpp
 */
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define MP make_pair
#define PB push_back
#define X first
#define Y second
#define FI first
#define SE second
#define inf 0x3f3f3f3f
#define FOR(i,a,b) for(int i = a; i <= b; ++i)
#define FORD(i,a,b) for(int i = b; i >= a; --i)
#define ALL(x) x.begin(),x.end()
#define REP(i,a) for(int i = 0; i < a; ++i)
#define DEP(i,a) for(int i = a-1; i >= 0; --i)
#define CLR(a) memset(a, 0, sizeof a)
const int N = 1e6 + 1024;
int a[N], p[N];
int index[N];
int main() {
    int n;
    scanf("%d", &n);
    for(int i = 1; i <= n; ++i) {
        scanf("%d", &a[i]);
        p[i] = i;
        index[i] = i;
    }
    int cnt = 0;
    for(int i = 1; i <= n; ++i) {
        if(a[i] != p[i]) {
            cnt++;
            int pos = index[a[i]];
            int b = a[i];
            swap(index[p[i]], index[a[i]]);
            swap(p[i], p[pos]); 
        }
    }
    if((cnt&1) == (n&1)) puts("Petr");
    else puts("Um_nik");
    return 0;
}
```
